/**
 * Netlify Function: send-newsletter
 *
 * Recibe email + idioma desde el formulario de newsletter,
 * valida honeypot anti-spam, aplica rate limiting,
 * envía un email transaccional vía SMTP de IONOS
 * con el link de descarga de la guía, y notifica al equipo.
 *
 * Variables de entorno requeridas en Netlify:
 *   SMTP_HOST     (ej: smtp.ionos.es)
 *   SMTP_PORT     (ej: 587)
 *   SMTP_USER     (ej: newsletter@alojamientostossademar.com)
 *   SMTP_PASS
 */

import nodemailer from "nodemailer";

const ALLOWED_ORIGINS = [
  "https://alojamientostossademar.com",
  "https://www.alojamientostossademar.com",
  "http://localhost:4321",
  "http://localhost:8888",
];

const PDF_URL = "https://alojamientostossademar.com/downloads/guia-rincones-secretos-tossa.pdf";

// Rate limiting en memoria (se resetea en cold start, pero bloquea spam masivo)
const RATE_LIMIT_MS = 60_000; // 1 minuto entre intentos por email
const rateLimitMap = new Map();

const EMAIL_TEMPLATES = {
  es: {
    subjectUser: "Tu guía secreta de Tossa de Mar está aquí",
    subjectTeam: "Nuevo suscriptor a la guía secreta",
    greeting: "Hola",
    body: `
      <p>¡Gracias por tu interés en descubrir Tossa de Mar como un local!</p>
      <p>Te enviamos el link para descargar tu guía exclusiva con los <strong>5 rincones secretos</strong> que solo los habitantes de Tossa conocen:</p>
      <p style="margin: 24px 0;">
        <a href="${PDF_URL}" style="background:#8B7355;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;">
          📥 Descargar guía gratuita
        </a>
      </p>
      <p>Además, como suscriptor, serás el primero en recibir:</p>
      <ul>
        <li>Ofertas de última hora exclusivas</li>
        <li>Nuevas guías secretas de la Costa Brava</li>
        <li>Recomendaciones de restaurantes locales</li>
      </ul>
      <p style="margin-top:24px;color:#666;">
        Si el botón no funciona, copia y pega este link en tu navegador:<br>
        <a href="${PDF_URL}">${PDF_URL}</a>
      </p>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        © Alojamientos Tossa de Mar — El Hostalet de Tossa & El Bergantí<br>
        Tossa de Mar, Costa Brava<br>
        <a href="https://alojamientostossademar.com">alojamientostossademar.com</a>
      </p>
    `,
    bodyTeam: (email) => `Nuevo suscriptor a la guía secreta:<br><strong>${email}</strong>`,
  },
  ca: {
    subjectUser: "La teva guia secreta de Tossa de Mar és aquí",
    subjectTeam: "Nou subscriptor a la guia secreta",
    greeting: "Hola",
    body: `
      <p>Gràcies pel teu interès a descobrir Tossa de Mar com un local!</p>
      <p>T'enviem l'enllaç per descarregar la teva guia exclusiva amb els <strong>5 racons secrets</strong> que només coneixen els habitants de Tossa:</p>
      <p style="margin: 24px 0;">
        <a href="${PDF_URL}" style="background:#8B7355;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;">
          📥 Descarregar guia gratuïta
        </a>
      </p>
      <p>A més, com a subscriptor, seràs el primer a rebre:</p>
      <ul>
        <li>Ofertes de darrera hora exclusives</li>
        <li>Noves guies secretes de la Costa Brava</li>
        <li>Recomanacions de restaurants locals</li>
      </ul>
      <p style="margin-top:24px;color:#666;">
        Si el botó no funciona, copia i enganxa aquest enllaç al teu navegador:<br>
        <a href="${PDF_URL}">${PDF_URL}</a>
      </p>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        © Alojamientos Tossa de Mar — El Hostalet de Tossa & El Bergantí<br>
        Tossa de Mar, Costa Brava<br>
        <a href="https://alojamientostossademar.com">alojamientostossademar.com</a>
      </p>
    `,
    bodyTeam: (email) => `Nou subscriptor a la guia secreta:<br><strong>${email}</strong>`,
  },
  en: {
    subjectUser: "Your secret Tossa de Mar guide is here",
    subjectTeam: "New subscriber to the secret guide",
    greeting: "Hello",
    body: `
      <p>Thank you for your interest in discovering Tossa de Mar like a local!</p>
      <p>Here is the link to download your exclusive guide with the <strong>5 hidden spots</strong> only Tossa residents know about:</p>
      <p style="margin: 24px 0;">
        <a href="${PDF_URL}" style="background:#8B7355;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;">
          📥 Download free guide
        </a>
      </p>
      <p>Plus, as a subscriber, you will be the first to receive:</p>
      <ul>
        <li>Exclusive last-minute offers</li>
        <li>New secret guides of the Costa Brava</li>
        <li>Local restaurant recommendations</li>
      </ul>
      <p style="margin-top:24px;color:#666;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${PDF_URL}">${PDF_URL}</a>
      </p>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        © Alojamientos Tossa de Mar — El Hostalet de Tossa & El Bergantí<br>
        Tossa de Mar, Costa Brava<br>
        <a href="https://alojamientostossademar.com">alojamientostossademar.com</a>
      </p>
    `,
    bodyTeam: (email) => `New subscriber to the secret guide:<br><strong>${email}</strong>`,
  },
  fr: {
    subjectUser: "Votre guide secret de Tossa de Mar est ici",
    subjectTeam: "Nouvel abonné au guide secret",
    greeting: "Bonjour",
    body: `
      <p>Merci pour votre intérêt à découvrir Tossa de Mar comme un habitant!</p>
      <p>Voici le lien pour télécharger votre guide exclusif avec les <strong>5 recoins cachés</strong> que seuls les habitants de Tossa connaissent:</p>
      <p style="margin: 24px 0;">
        <a href="${PDF_URL}" style="background:#8B7355;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;">
          📥 Télécharger le guide gratuit
        </a>
      </p>
      <p>De plus, en tant qu'abonné, vous serez le premier à recevoir:</p>
      <ul>
        <li>Des offres exclusives de dernière minute</li>
        <li>De nouveaux guides secrets de la Costa Brava</li>
        <li>Des recommandations de restaurants locaux</li>
      </ul>
      <p style="margin-top:24px;color:#666;">
        Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur:<br>
        <a href="${PDF_URL}">${PDF_URL}</a>
      </p>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        © Alojamientos Tossa de Mar — El Hostalet de Tossa & El Bergantí<br>
        Tossa de Mar, Costa Brava<br>
        <a href="https://alojamientostossademar.com">alojamientostossademar.com</a>
      </p>
    `,
    bodyTeam: (email) => `Nouvel abonné au guide secret:<br><strong>${email}</strong>`,
  },
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

function checkRateLimit(email) {
  const now = Date.now();
  const lastAttempt = rateLimitMap.get(email);
  if (lastAttempt && now - lastAttempt < RATE_LIMIT_MS) {
    const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastAttempt)) / 1000);
    return { limited: true, secondsLeft };
  }
  rateLimitMap.set(email, now);
  return { limited: false };
}

export default async (req, context) => {
  const origin = req.headers.get("origin") || "";

  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: getCorsHeaders(origin),
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: getCorsHeaders(origin),
    });
  }

  const { email, lang = "es", honeypot } = body;

  // 1. Honeypot anti-spam: si está relleno, es un bot
  if (honeypot && honeypot.trim() !== "") {
    // Devolvemos 200 para no alertar al bot, pero no hacemos nada
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: getCorsHeaders(origin),
    });
  }

  // 2. Validar email
  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Email no válido" }), {
      status: 400,
      headers: getCorsHeaders(origin),
    });
  }

  // 3. Rate limiting (anti-spam)
  const rateCheck = checkRateLimit(email.toLowerCase().trim());
  if (rateCheck.limited) {
    return new Response(
      JSON.stringify({ error: `Por favor espera ${rateCheck.secondsLeft}s antes de volver a intentarlo.` }),
      { status: 429, headers: getCorsHeaders(origin) }
    );
  }

  const template = EMAIL_TEMPLATES[lang] || EMAIL_TEMPLATES.es;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  try {
    // 1. Enviar guía al usuario
    await transporter.sendMail({
      from: `"Alojamientos Tossa de Mar" <${process.env.SMTP_USER}>`,
      to: email,
      subject: template.subjectUser,
      html: `<p>${template.greeting},</p>${template.body}`,
    });

    // 2. Notificar al equipo
    await transporter.sendMail({
      from: `"Alojamientos Tossa de Mar" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: template.subjectTeam,
      html: template.bodyTeam(email),
    });

    return new Response(JSON.stringify({ success: true, message: "Email enviado" }), {
      status: 200,
      headers: getCorsHeaders(origin),
    });
  } catch (err) {
    console.error("Error enviando email:", err);
    return new Response(JSON.stringify({ error: "Error al enviar el email. Inténtalo de nuevo más tarde." }), {
      status: 500,
      headers: getCorsHeaders(origin),
    });
  }
};
