export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = await request.text();
  const params = new URLSearchParams(body);

  // Honeypot anti-spam
  const botField = params.get('bot-field');
  if (botField && botField.trim() !== '') {
    return new Response('Spam detected', { status: 400 });
  }

  const formName = params.get('form-name') || 'unknown';
  const lang = params.get('lang') || 'ca';
  const successUrl = params.get('successUrl') || '/ca/reserva-enviada/';
  const emailFromUser = params.get('email') || '';

  let subject = 'Nou enviament de formulari';
  let html = '<p>\'ha rebut un nou enviament.</p>';

  if (formName === 'booking' || formName === 'booking-room') {
    const name = params.get('name') || '-';
    const phone = params.get('phone') || '-';
    const checkin = params.get('checkin') || '-';
    const checkout = params.get('checkout') || '-';
    const adults = params.get('adults') || '-';
    const children = params.get('children') || '-';
    const property = params.get('property') || params.get('roomType') || 'Sense especificar';
    const notes = params.get('notes') || '-';

    subject = `Nova sol·licitud de reserva - ${property}`;
    html = `
      <h2 style="color:#1a3a4a;">Nova sol·licitud de reserva</h2>
      <table style="border-collapse:collapse;max-width:600px;">
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Propietat</td><td>${property}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Nom</td><td>${name}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Email</td><td><a href="mailto:${emailFromUser}">${emailFromUser}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Telèfon</td><td>${phone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Data entrada</td><td>${checkin}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Data sortida</td><td>${checkout}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Adults</td><td>${adults}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Nens</td><td>${children}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Notes</td><td>${notes.replace(/\n/g, '<br>')}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Idioma del formulari</td><td>${lang}</td></tr>
      </table>
      <p style="margin-top:20px;color:#666;font-size:12px;">Aquest missatge s'ha enviat des del formulari de reserva de alojamientostossademar.com</p>
    `;
  } else if (formName === 'contact') {
    const name = params.get('fullName') || params.get('name') || '-';
    const phone = params.get('phone') || '-';
    const subjectField = params.get('subject') || 'Sense assumpte';
    const message = params.get('message') || '-';

    subject = `Nou missatge de contacte - ${subjectField}`;
    html = `
      <h2 style="color:#1a3a4a;">Nou missatge de contacte</h2>
      <table style="border-collapse:collapse;max-width:600px;">
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Nom</td><td>${name}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Email</td><td><a href="mailto:${emailFromUser}">${emailFromUser}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Telèfon</td><td>${phone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Assumpte</td><td>${subjectField}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Missatge</td><td>${message.replace(/\n/g, '<br>')}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold;">Idioma del formulari</td><td>${lang}</td></tr>
      </table>
      <p style="margin-top:20px;color:#666;font-size:12px;">Aquest missatge s'ha enviat des del formulari de contacte de alojamientostossademar.com</p>
    `;
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Alojamientos Tossa <onboarding@resend.dev>',
          to: ['reservas@alojamientostossademar.com'],
          subject,
          html,
          reply_to: emailFromUser || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend error:', err);
      }
    } catch (e) {
      console.error('Error sending email:', e);
    }
  } else {
    console.warn('RESEND_API_KEY not configured, skipping email send.');
  }

  // Redirect user to success page
  return Response.redirect(successUrl, 303);
};
