import fs from 'fs';
import path from 'path';

const blogDir = 'src/content/blog';

const contents = {
  'guia-tossa-de-mar': {
    es: `Tossa de Mar, conocida como la "Perla de la Costa Brava", es uno de los destinos más mágicos de Cataluña. Su recinto amurallado, el único ejemplo de población medieval fortificada que todavía existe en la costa catalana, enamora a todos sus visitantes.

Desde **El Bergantí & Hostalet**, situados en pleno corazón de Tossa, queremos compartir contigo nuestra guía personal con los mejores lugares que no te puedes perder.

## 1. La Vila Vella (El Castillo de Tossa)
El recinto amurallado de la Vila Vella es el emblema de Tossa. Pasear por sus calles empedradas te transportará a la época medieval. Las murallas, construidas entre los siglos XII y XIV para proteger a la población de los ataques piratas, ofrecen unas vistas impresionantes al mar Mediterráneo.

*Consejo local:* Sube al atardecer para disfrutar de una de las mejores puestas de sol de la Costa Brava y relájate en el Faro de Tossa, donde podrás tomar algo escuchando el mar.

## 2. Las Mejores Calas y Playas
Tossa de Mar no es solo historia; sus playas tienen aguas cristalinas y arena gruesa.
- **Platja Gran:** Es la playa principal, justo a los pies del castillo. Ideal si buscas comodidad y servicios.
- **Cala Pola:** A pocos kilómetros del centro, es una cala rodeada de pinos que parece sacada de una postal.
- **Cala Futadera:** Más salvaje y virgen, conocida como la "cala de los 300 escalones". Perfecta para hacer snorkel.

## 3. Gastronomía: ¿Qué comer en Tossa?
La gastronomía de Tossa está profundamente ligada al mar. El plato estrella por excelencia es el **Cim i Tomba**, un antiguo plato de pescadores elaborado con pescado de roca, patatas y un alioli suave que se hierve hasta quedar delicioso.`,
    ca: `Tossa de Mar, coneguda com la "Perla de la Costa Brava", és un dels destins més màgics de Catalunya. El seu recinte amurallat, l'únic exemple de població medieval fortificada que encara existeix a la costa catalana, enamora tots els seus visitants.

Des de **El Bergantí & Hostalet**, situats al cor de Tossa, volem compartir amb tu la nostra guia personal amb els millors llocs que no et pots perdre.

## 1. La Vila Vella (El Castell de Tossa)
El recinte amurallat de la Vila Vella és l'emblema de Tossa. Passejar pels seus carrers empedrats et transportarà a l'època medieval. Les muralles, construïdes entre els segles XII i XIV per protegir la població dels atacs pirates, ofereixen unes vistes impressionants al mar Mediterrani.

*Consell local:* Puja al capvespre per gaudir d'una de les millors postes de sol de la Costa Brava i relaxa't al Far de Tossa, on podràs prendre alguna cosa escoltant el mar.

## 2. Les Millors Cales i Platges
Tossa de Mar no és només història; les seves platges tenen aigües cristal·lines i sorra gruixuda.
- **Platja Gran:** És la platja principal, just als peus del castell. Ideal si busques comoditat i serveis.
- **Cala Pola:** A pocs quilòmetres del centre, és una cala rodejada de pins que sembla treta d'una postal.`,
    en: `Tossa de Mar, known as the "Pearl of the Costa Brava", is one of the most magical destinations in Catalonia. Its walled enclosure, the only example of a fortified medieval town that still exists on the Catalan coast, enchants all its visitors.

From **El Bergantí & Hostalet**, located in the heart of Tossa, we want to share with you our personal guide with the best places you cannot miss.

## 1. La Vila Vella (Tossa Castle)
The walled enclosure of Vila Vella is the emblem of Tossa. Walking through its cobbled streets will transport you to medieval times. The walls, built between the 12th and 14th centuries to protect the population from pirate attacks, offer stunning views of the Mediterranean Sea.

*Local tip:* Go up at sunset to enjoy one of the best sunsets on the Costa Brava and relax at the Tossa Lighthouse, where you can have a drink listening to the sea.

## 2. The Best Coves and Beaches
Tossa de Mar is not just history; its beaches have crystal clear waters and coarse sand.
- **Platja Gran:** It is the main beach, right at the foot of the castle. Ideal if you are looking for comfort and services.
- **Cala Pola:** A few kilometers from the center, it is a cove surrounded by pines that looks like it's from a postcard.`,
    fr: `Tossa de Mar, connue comme la "Perle de la Costa Brava", est l'une des destinations les plus magiques de Catalogne. Son enceinte fortifiée, le seul exemple de ville médiévale fortifiée qui existe encore sur la côte catalane, enchante tous ses visiteurs.

Depuis **El Bergantí & Hostalet**, situés au cœur de Tossa, nous souhaitons partager avec vous notre guide personnel avec les meilleurs endroits que vous ne pouvez pas manquer.

## 1. La Vila Vella (Le Château de Tossa)
L'enceinte fortifiée de la Vila Vella est l'emblème de Tossa. Se promener dans ses ruelles pavées vous transportera au Moyen Âge. Les remparts, construits entre le XIIe et le XIVe siècle pour protéger la population des attaques de pirates, offrent une vue imprenable sur la mer Méditerranée.

*Conseil local:* Montez au coucher du soleil pour profiter de l'un des mejores couchers de soleil de la Costa Brava et détendez-vous au phare de Tossa, où vous pourrez prendre un verre en écoutant la mer.`
  },
  'que-comer-tossa': {
    es: `La gastronomía de Tossa está profundamente ligada al mar. El plato estrella por excelencia es el **Cim i Tomba**, un antiguo plato de pescadores elaborado con pescado de roca, patatas y un alioli suave que se hierve hasta quedar delicioso.

Podrás degustar deliciosas tapas y platos locales en nuestro **Restaurante de Tapas El Bergantí**, situado justo debajo del alojamiento, ideal para reponer fuerzas tras un día de visitas.`,
    ca: `La gastronomia de Tossa està profundament lligada al mar. El plat estrella per excel·lència és el **Cim i Tomba**, un antic plat de pescadors elaborat amb peix de roca, patates i un allioli suau que es bull fins a quedar deliciós.

Podràs degustar delicioses tapes i plats locals al nostre **Restaurant de Tapes El Bergantí**, situat just a sota de l'allotjament, ideal per reposar forces després d'un dia de visites.`,
    en: `The gastronomy of Tossa is deeply linked to the sea. The star dish par excellence is the **Cim i Tomba**, an ancient fishermen's dish made with rock fish, potatoes, and a soft aioli that is boiled until delicious.

You can taste delicious tapas and local dishes in our **El Bergantí Tapas Restaurant**, located right below the accommodation, ideal for recharging your batteries after a day of sightseeing.`,
    fr: `La gastronomie de Tossa est profondément liée à la mer. Le plat vedette par excellence est le **Cim i Tomba**, un ancien plat de pêcheurs à base de poissons de roche, de pommes de terre y d'un aïoli doux qui est bouilli jusqu'à devenir délicieux.

Vous pourrez déguster de précieuses tapas et des plats locaux dans notre **Restaurant de Tapas El Bergantí**, situé juste en dessous de l'hébergement, idéal pour recharger ses batteries après une journée de visites.`
  },
  'directorio-util-tossa': {
    es: `Para que tus vacaciones en Tossa de Mar sean lo más cómodas y tranquilas posible, desde **El Bergantí & Hostalet** hemos preparado este directorio con la información práctica que nuestros clientes suelen solicitar. 

Guarda esta página en tus favoritos para tener siempre a mano los servicios más importantes durante tu estancia.

## Supermercados
Tossa cuenta con varios supermercados donde podrás abastecerte de todo lo necesario:
- **Esclat / Bon Preu:** Situado a la entrada del pueblo, es el supermercado más grande.
- **Caprabo:** Ubicado muy cerca de la estación de autobuses.
- **Pequeño comercio local:** Encontrarás panaderías y pequeñas tiendas de comestibles a lo largo de las calles peatonales del centro (Carrer de la Guàrdia, Carrer Socors).`,
    ca: `Perquè les teves vacances a Tossa de Mar siguin el més còmodes i tranqui·les possible, des de **El Bergantí & Hostalet** hem preparat aquest directori amb la informació pràctica que els nostres clients solen sol·licitar. 

Guarda aquesta pàgina als teus favorits per tenir sempre a mà els serveis més importants durant la teva estada.

## Supermercats
Tossa compta amb diversos supermercats on podràs abastir-te de tot el necessari:
- **Esclat / Bon Preu:** Situat a l'entrada del poble, és el supermercat més gran.
- **Caprabo:** Ubicat molt a prop de l'estació d'autobusos.`,
    en: `To make your holidays in Tossa de Mar as comfortable and peaceful as possible, from **El Bergantí & Hostalet** we have prepared this directory with the practical information that our clients usually request. 

Save this page in your favorites to always have the most important services at hand during your stay.

## Supermarkets
Tossa has several supermarkets where you can stock up on everything you need:
- **Esclat / Bon Preu:** Located at the entrance of the town, it is the largest supermarket.
- **Caprabo:** Located very close to the bus station.`,
    fr: `Pour que vos vacances à Tossa de Mar soient aussi confortables et paisibles que possible, depuis **El Bergantí & Hostalet** nous avons préparé cet annuaire avec les informations pratiques que nos clients demandent habituellement. 

Enregistrez cette page dans vos favoris pour toujours avoir les services les plus importants à portée de main pendant votre séjour.

## Supermarchés
Tossa dispose de plusieurs supermarchés où vous pourrez vous approvisionner de tout ce dont vous avez besoin :
- **Esclat / Bon Preu:** Situé à l'entrée du village, c'est le plus grand supermarché.
- **Caprabo:** Situé tout près de la gare routière.`
  },
  'playas-calas-tossa': {
    es: `Tossa de Mar no es solo historia; sus playas tienen aguas cristalinas y arena gruesa.
- **Platja Gran:** Es la playa principal, justo a los pies del castillo. Ideal si buscas comodidad y servicios.
- **Cala Pola:** A pocos kilómetros del centro, es una cala rodeada de pinos que parece sacada de una postal.
- **Cala Futadera:** Más salvaje y virgen, conocida como la "cala de los 300 escalones". Perfecta para hacer snorkel.`,
    ca: `Tossa de Mar no és només història; les seves platges tenen aigües cristal·lines i sorra gruixuda.
- **Platja Gran:** És la platja principal, just als peus del castell. Ideal si busques comoditat i serveis.
- **Cala Pola:** A pocs quilòmetres del centre, és una cala rodejada de pins que sembla treta d'una postal.`,
    en: `Tossa de Mar is not just history; its beaches have crystal clear waters and coarse sand.
- **Platja Gran:** It is the main beach, right at the foot of the castle. Ideal if you are looking for comfort and services.
- **Cala Pola:** A few kilometers from the center, it is a cove surrounded by pines that looks like it's from a postcard.`,
    fr: `Tossa de Mar, ce n'est pas seulement de l'histoire; ses playas tienen aguas cristalinas y arena gruesa.
- **Platja Gran:** C'est la plage principale, juste au pied du château. Idéale si vous recherchez le confort et les services.
- **Cala Pola:** À quelques kilomètres du centre, c'est une crique entourée de pins qui semble tout droit sortie d'une carte postale.`
  },
  'tossa-con-ninos': {
    es: `Tossa de Mar es un destino fantástico para viajar con niños. Sus playas de arena gruesa y aguas tranquilas son ideales para los más pequeños. Además, el ambiente familiar del pueblo lo convierte en un lugar seguro y acogedor.`,
    ca: `Tossa de Mar és un destí fantàstic per viatjar amb nens. Les seves platges de sorra gruixuda i aigües tranqui·les són ideals per als més petits. A més, l'ambient familiar del poble el converteix en un lloc segur i acollidor.`,
    en: `Tossa de Mar is a fantastic destination for traveling with children. Its beaches with coarse sand and calm waters are ideal for the little ones. In addition, the family atmosphere of the town makes it a safe and welcoming place.`,
    fr: `Tossa de Mar est une destination fantastique pour voyager avec des enfants. Ses plages de sable grossier et ses eaux calmes sont idéales pour les plus petits. De plus, l'ambiance familiale du village en fait un lieu sûr et accueillant.`
  },
  'senderismo-tossa': {
    es: `Explora los caminos de ronda de Tossa. Estas rutas bordean la costa y ofrecen vistas espectaculares del Mediterráneo. Es la mejor forma de descubrir las calas más recónditas y disfrutar de la naturaleza en estado puro.`,
    ca: `Explora els camins de ronda de Tossa. Aquestes rutes voregen la costa i ofereixen vistes espectaculars de la Mediterrània. És la millor forma de descobrir les cales més recòndites i gaudir de la natura en estat pur.`,
    en: `Explore the paths of Tossa. These routes border the coast and offer spectacular views of the Mediterranean. It is the best way to discover the most remote coves and enjoy nature in its purest state.`,
    fr: `Explorez les sentiers de Tossa. Ces itinéraires bordent la côte et offrent des vues spectaculaires sur la Méditerranée. C'est le meilleur moyen de découvrir les criques les plus reculées et de profiter de la nature à l'état pur.`
  }
};

const languages = ['es', 'ca', 'en', 'fr'];
const slugs = Object.keys(contents);

const config = {
  'guia-tossa-de-mar': {
    es: { title: "Guía Completa de Tossa de Mar: Qué Ver y Hacer", desc: "Descubre los secretos de la Vila Vella, el castillo y las mejores rutas de Tossa.", cat: "Guía de Viaje", img: "tossa-de-mar-vila-vella.png" },
    ca: { title: "Guia Completa de Tossa de Mar: Què Veure i Fer", desc: "Descobreix els secrets de la Vila Vella, el castell i les millors rutes de Tossa.", cat: "Guia de Viatge", img: "tossa-de-mar-vila-vella.png" },
    en: { title: "Complete Guide to Tossa de Mar: What to See and Do", desc: "Discover the secrets of Vila Vella, the castle, and the best routes in Tossa.", cat: "Travel Guide", img: "tossa-de-mar-vila-vella.png" },
    fr: { title: "Guide Complet de Tossa de Mar : Que Voir et Faire", desc: "Découvrez les secrets de Vila Vella, le château et les meilleurs itinéraires de Tossa.", cat: "Guide de Voyage", img: "tossa-de-mar-vila-vella.png" }
  },
  'que-comer-tossa': {
    es: { title: "Qué Comer en Tossa: Platos Típicos y Mejores Restaurantes", desc: "Desde el Cim i Tomba hasta el pescado fresco. La mejor gastronomía de la Costa Brava.", cat: "Gastronomía", img: "restaurante-tradicional-en-tossa.png" },
    ca: { title: "Què Menjar a Tossa: Plats Típics i Millors Restaurants", desc: "Des del Cim i Tomba fins al peix fresc. La millor gastronomia de la Costa Brava.", cat: "Gastronomia", img: "restaurante-tradicional-en-tossa.png" },
    en: { title: "What to Eat in Tossa: Typical Dishes and Best Restaurants", desc: "From Cim i Tomba to fresh fish. The best gastronomy of the Costa Brava.", cat: "Gastronomy", img: "restaurante-tradicional-en-tossa.png" },
    fr: { title: "Que Manger à Tossa : Plats Typiques et Meilleurs Restaurants", desc: "Du Cim i Tomba au poisson frais. La meilleure gastronomie de la Costa Brava.", cat: "Gastronomie", img: "restaurante-tradicional-en-tossa.png" }
  },
  'directorio-util-tossa': {
    es: { title: "Directorio Útil de Tossa: Farmacias, Supermercados y Más", desc: "Toda la información práctica que necesitas durante tu estancia en Tossa de Mar.", cat: "Información Útil", img: "ciudad-tossa-de-mar-farmacia.png" },
    ca: { title: "Directori Útil de Tossa: Farmàcies, Supermercats i Més", desc: "Tota la informació pràctica que necessites durant la teva estada a Tossa de Mar.", cat: "Informació Útil", img: "ciudad-tossa-de-mar-farmacia.png" },
    en: { title: "Useful Directory of Tossa: Pharmacies, Supermarkets and More", desc: "All the practical information you need during your stay in Tossa de Mar.", cat: "Useful Info", img: "ciudad-tossa-de-mar-farmacia.png" },
    fr: { title: "Répertoire Utile de Tossa : Pharmacies, Supermarchés et Plus", desc: "Toutes les informations pratiques dont vous avez besoin lors de votre séjour à Tossa de Mar.", cat: "Infos Pratiques", img: "ciudad-tossa-de-mar-farmacia.png" }
  },
  'playas-calas-tossa': {
    es: { title: "Las Mejores Playas y Calas de Tossa de Mar", desc: "Descubre los rincones más espectaculares de la costa de Tossa: desde la Gran Platja hasta calas escondidas.", cat: "Playas", img: "playas-y-calas-tossa-de-mar.png" },
    ca: { title: "Les Millors Platges i Cales de Tossa de Mar", desc: "Descobreix els racons més espectaculars de la costa de Tossa: des de la Platja Gran fins a cales amagades.", cat: "Platges", img: "playas-y-calas-tossa-de-mar.png" },
    en: { title: "The Best Beaches and Coves in Tossa de Mar", desc: "Discover the most spectacular spots on the Tossa coast: from the Main Beach to hidden coves.", cat: "Beaches", img: "playas-y-calas-tossa-de-mar.png" },
    fr: { title: "Les Meilleures Plages et Criques de Tossa de Mar", desc: "Découvrez les coins les plus spectaculaires de la côte de Tossa : de la Grande Plage aux criques cachées.", cat: "Plages", img: "playas-y-calas-tossa-de-mar.png" }
  },
  'tossa-con-ninos': {
    es: { title: "Tossa de Mar con Niños: Planes Familiares Ideales", desc: "Actividades, parques y playas seguras para disfrutar de unas vacaciones en familia en Tossa.", cat: "Familia", img: "tossa-de-mar-vila-vella.png" },
    ca: { title: "Tossa de Mar amb Nens: Plans Familiars Ideals", desc: "Activitats, parcs i platges segures per gaudir d'unes vacances en família a Tossa.", cat: "Família", img: "tossa-de-mar-vila-vella.png" },
    en: { title: "Tossa de Mar with Kids: Ideal Family Plans", desc: "Activities, parks, and safe beaches to enjoy a family holiday in Tossa.", cat: "Family", img: "tossa-de-mar-vila-vella.png" },
    fr: { title: "Tossa de Mar avec des Enfants : Plans Familiaux Idéaux", desc: "Activités, parcs et plages sûres pour profiter de vacances en famille à Tossa.", cat: "Famille", img: "tossa-de-mar-vila-vella.png" }
  },
  'senderismo-tossa': {
    es: { title: "Rutas de Senderismo: El Camí de Ronda en Tossa", desc: "Explora la costa brava a pie con las mejores rutas de senderismo desde Tossa de Mar.", cat: "Naturaleza", img: "playas-y-calas-tossa-de-mar.png" },
    ca: { title: "Rutes de Senderisme: El Camí de Ronda a Tossa", desc: "Explora la costa brava a peu amb les millors rutes de senderisme des de Tossa de Mar.", cat: "Natura", img: "playas-y-calas-tossa-de-mar.png" },
    en: { title: "Hiking Routes: The Camí de Ronda in Tossa", desc: "Explore the Costa Brava on foot with the best hiking routes from Tossa de Mar.", cat: "Nature", img: "playas-y-calas-tossa-de-mar.png" },
    fr: { title: "Itinéraires de Randonnée : Le Camí de Ronda à Tossa", desc: "Explorez la Costa Brava à pied avec les meilleurs itinéraires de randonnée au départ de Tossa de Mar.", cat: "Nature", img: "playas-y-calas-tossa-de-mar.png" }
  }
};

const ctas = {
  es: { title: "Reserva tu Estancia", btn: "Comprobar Disponibilidad", link: "/reservas" },
  ca: { title: "Reserva la teva Estada", btn: "Comprovar Disponibilitat", link: "/ca/reserves" },
  en: { title: "Book your Stay", btn: "Check Availability", link: "/en/booking" },
  fr: { title: "Réservez votre Séjour", btn: "Vérifier la Disponibilité", link: "/fr/reservations" }
};

languages.forEach(lang => {
  const dir = path.join(blogDir, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  slugs.forEach(slug => {
    const data = config[slug][lang];
    const cta = ctas[lang];
    const body = contents[slug][lang];
    const content = `---
title: "${data.title}"
description: "${data.desc}"
date: "2026-05-16"
author: "El Bergantí & Hostalet"
image: "/images/${data.img}"
category: "${data.cat}"
tags: ["Tossa de Mar", "${data.cat}"]
readingTime: 5
---

import BlogCTA from '@src/components/BlogCTA.astro';

${body}

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

console.log('Restoration complete');
