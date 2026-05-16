const fs = require('fs');
const path = require('path');

// 1. Move images to public/images/ and rename them for each language (simulated for content, I'll do the actual copy/rename in shell)
// For now, I'll use the existing paths but corrected.

const languages = ['es', 'ca', 'en', 'fr'];
const slugs = [
  'guia-tossa-de-mar', 
  'que-comer-tossa', 
  'directorio-util-tossa', 
  'playas-calas-tossa',
  'tossa-con-ninos',
  'senderismo-tossa'
];

const config = {
  'guia-tossa-de-mar': {
    es: { title: 'Guía Completa de Tossa de Mar: Qué Ver y Hacer', desc: 'Descubre los secretos de la Vila Vella, el castillo y las mejores rutas de Tossa.', cat: 'Guía de Viaje', img: 'tossa-de-mar-vila-vella.png' },
    ca: { title: 'Guia Completa de Tossa de Mar: Què Veure i Fer', desc: 'Descobreix els secrets de la Vila Vella, el castell i les millors rutes de Tossa.', cat: 'Guia de Viatge', img: 'tossa-de-mar-vila-vella.png' },
    en: { title: 'Complete Guide to Tossa de Mar: What to See and Do', desc: 'Discover the secrets of Vila Vella, the castle, and the best routes in Tossa.', cat: 'Travel Guide', img: 'tossa-de-mar-vila-vella.png' },
    fr: { title: 'Guide Complet de Tossa de Mar : Que Voir et Faire', desc: 'Découvrez les secrets de Vila Vella, le château et les meilleurs itinéraires de Tossa.', cat: 'Guide de Voyage', img: 'tossa-de-mar-vila-vella.png' }
  },
  'que-comer-tossa': {
    es: { title: 'Qué Comer en Tossa: Platos Típicos y Mejores Restaurantes', desc: 'Desde el Cim i Tomba hasta el pescado fresco. La mejor gastronomía de la Costa Brava.', cat: 'Gastronomía', img: 'restaurante-tradicional-en-tossa.png' },
    ca: { title: 'Què Menjar a Tossa: Plats Típics i Millors Restaurants', desc: 'Des del Cim i Tomba fins al peix fresc. La millor gastronomia de la Costa Brava.', cat: 'Gastronomia', img: 'restaurante-tradicional-en-tossa.png' },
    en: { title: 'What to Eat in Tossa: Typical Dishes and Best Restaurants', desc: 'From Cim i Tomba to fresh fish. The best gastronomy of the Costa Brava.', cat: 'Gastronomy', img: 'restaurante-tradicional-en-tossa.png' },
    fr: { title: 'Que Manger à Tossa : Plats Typiques et Meilleurs Restaurants', desc: 'Du Cim i Tomba au poisson frais. La meilleure gastronomie de la Costa Brava.', cat: 'Gastronomie', img: 'restaurante-tradicional-en-tossa.png' }
  },
  'directorio-util-tossa': {
    es: { title: 'Directorio Útil de Tossa: Farmacias, Supermercados y Más', desc: 'Toda la información práctica que necesitas durante tu estancia en Tossa de Mar.', cat: 'Información Útil', img: 'ciudad-tossa-de-mar-farmacia.png' },
    ca: { title: 'Directori Útil de Tossa: Farmàcies, Supermercats i Més', desc: 'Tota la informació pràctica que necessites durant la teva estada a Tossa de Mar.', cat: 'Informació Útil', img: 'ciudad-tossa-de-mar-farmacia.png' },
    en: { title: 'Useful Directory of Tossa: Pharmacies, Supermarkets and More', desc: 'All the practical information you need during your stay in Tossa de Mar.', cat: 'Useful Info', img: 'ciudad-tossa-de-mar-farmacia.png' },
    fr: { title: 'Répertoire Utile de Tossa : Pharmacies, Supermarchés et Plus', desc: 'Toutes les informations pratiques dont vous avez besoin lors de votre séjour à Tossa de Mar.', cat: 'Infos Pratiques', img: 'ciudad-tossa-de-mar-farmacia.png' }
  },
  'playas-calas-tossa': {
    es: { title: 'Las Mejores Playas y Calas de Tossa de Mar', desc: 'Descubre los rincones más espectaculares de la costa de Tossa: desde la Gran Platja hasta calas escondidas.', cat: 'Playas', img: 'playas-y-calas-tossa-de-mar.png' },
    ca: { title: 'Les Millors Platges i Cales de Tossa de Mar', desc: 'Descobreix els racons més espectaculars de la costa de Tossa: des de la Platja Gran fins a cales amagades.', cat: 'Platges', img: 'playas-y-calas-tossa-de-mar.png' },
    en: { title: 'The Best Beaches and Coves in Tossa de Mar', desc: 'Discover the most spectacular spots on the Tossa coast: from the Main Beach to hidden coves.', cat: 'Beaches', img: 'playas-y-calas-tossa-de-mar.png' },
    fr: { title: 'Les Meilleures Plages et Criques de Tossa de Mar', desc: 'Découvrez les coins les plus spectaculaires de la côte de Tossa : de la Grande Plage aux criques cachées.', cat: 'Plages', img: 'playas-y-calas-tossa-de-mar.png' }
  },
  'tossa-con-ninos': {
    es: { title: 'Tossa de Mar con Niños: Planes Familiares Ideales', desc: 'Actividades, parques y playas seguras para disfrutar de unas vacaciones en familia en Tossa.', cat: 'Familia', img: 'tossa-de-mar-vila-vella.png' },
    ca: { title: 'Tossa de Mar amb Nens: Plans Familiars Ideals', desc: 'Activitats, parcs i platges segures per gaudir d\'unes vacances en família a Tossa.', cat: 'Família', img: 'tossa-de-mar-vila-vella.png' },
    en: { title: 'Tossa de Mar with Kids: Ideal Family Plans', desc: 'Activities, parks, and safe beaches to enjoy a family holiday in Tossa.', cat: 'Family', img: 'tossa-de-mar-vila-vella.png' },
    fr: { title: 'Tossa de Mar avec des Enfants : Plans Familiaux Idéaux', desc: 'Activités, parcs et plages sûres pour profiter de vacances en famille à Tossa.', cat: 'Famille', img: 'tossa-de-mar-vila-vella.png' }
  },
  'senderismo-tossa': {
    es: { title: 'Rutas de Senderismo: El Camí de Ronda en Tossa', desc: 'Explora la costa brava a pie con las mejores rutas de senderismo desde Tossa de Mar.', cat: 'Naturaleza', img: 'playas-y-calas-tossa-de-mar.png' },
    ca: { title: 'Rutes de Senderisme: El Camí de Ronda a Tossa', desc: 'Explora la costa brava a peu amb les millors rutes de senderisme des de Tossa de Mar.', cat: 'Natura', img: 'playas-y-calas-tossa-de-mar.png' },
    en: { title: 'Hiking Routes: The Camí de Ronda in Tossa', desc: 'Explore the Costa Brava on foot with the best hiking routes from Tossa de Mar.', cat: 'Nature', img: 'playas-y-calas-tossa-de-mar.png' },
    fr: { title: 'Itinéraires de Randonnée : Le Camí de Ronda à Tossa', desc: 'Explorez la Costa Brava à pied avec les meilleurs itinéraires de randonnée au départ de Tossa de Mar.', cat: 'Nature', img: 'playas-y-calas-tossa-de-mar.png' }
  }
};

const ctas = {
  es: { title: 'Reserva tu Estancia', btn: 'Comprobar Disponibilidad', link: '/reservas' },
  ca: { title: 'Reserva la teva Estada', btn: 'Comprovar Disponibilitat', link: '/ca/reserves' },
  en: { title: 'Book your Stay', btn: 'Check Availability', link: '/en/booking' },
  fr: { title: 'Réservez votre Séjour', btn: 'Vérifier la Disponibilité', link: '/fr/reservations' }
};

languages.forEach(lang => {
  const dir = path.join('src', 'content', 'blog', lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  slugs.forEach(slug => {
    const data = config[slug][lang];
    const cta = ctas[lang];
    const content = `---
title: "${data.title}"
description: "${data.desc}"
date: "2026-05-16"
author: "El Bergantí & Hostalet"
image: "/images/mas tossa/${data.img}"
category: "${data.cat}"
tags: ["Tossa de Mar", "${data.cat}"]
readingTime: 5
---

import BlogCTA from '@src/components/BlogCTA.astro';

Bienvenidos a nuestra guía sobre ${data.title}. 

<BlogCTA 
  title="${cta.title}" 
  text="Reserva directamente con nosotros para obtener el mejor precio y trato familiar." 
  buttonText="${cta.btn}" 
  link="${cta.link}" 
/>
`;
    fs.writeFileSync(path.join(dir, slug + '.mdx'), content);
  });
});

console.log('All 24 posts updated successfully with 6 posts per language');
