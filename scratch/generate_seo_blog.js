import fs from 'fs';
import path from 'path';

const blogDir = 'src/content/blog';
const imagesDir = 'public/images';

const imageTranslations = {
  'guia-tossa-de-mar': {
    es: { src: 'tossa-de-mar-vila-vella.png', dest: 'tossa-de-mar-vila-vella.png' },
    ca: { src: 'tossa-de-mar-vila-vella.png', dest: 'tossa-de-mar-vila-vella-ca.png' },
    en: { src: 'tossa-de-mar-vila-vella.png', dest: 'tossa-de-mar-old-town.png' },
    fr: { src: 'tossa-de-mar-vila-vella.png', dest: 'tossa-de-mar-vieille-ville.png' }
  },
  'que-comer-tossa': {
    es: { src: 'restaurante-tradicional-en-tossa.png', dest: 'restaurante-tradicional-en-tossa.png' },
    ca: { src: 'restaurante-tradicional-en-tossa.png', dest: 'restaurant-tradicional-tossa-ca.png' },
    en: { src: 'restaurante-tradicional-en-tossa.png', dest: 'traditional-restaurant-tossa.png' },
    fr: { src: 'restaurante-tradicional-en-tossa.png', dest: 'restaurant-traditionnel-tossa.png' }
  },
  'directorio-util-tossa': {
    es: { src: 'ciudad-tossa-de-mar-farmacia.png', dest: 'ciudad-tossa-de-mar-farmacia.png' },
    ca: { src: 'ciudad-tossa-de-mar-farmacia.png', dest: 'ciutat-tossa-de-mar-farmacia-ca.png' },
    en: { src: 'ciudad-tossa-de-mar-farmacia.png', dest: 'tossa-de-mar-city-pharmacy.png' },
    fr: { src: 'ciudad-tossa-de-mar-farmacia.png', dest: 'ville-tossa-de-mar-pharmacie.png' }
  },
  'playas-calas-tossa': {
    es: { src: 'playas-y-calas-tossa-de-mar.png', dest: 'playas-y-calas-tossa-de-mar.png' },
    ca: { src: 'playas-y-calas-tossa-de-mar.png', dest: 'platges-i-cales-tossa-de-mar-ca.png' },
    en: { src: 'playas-y-calas-tossa-de-mar.png', dest: 'beaches-and-coves-tossa-de-mar.png' },
    fr: { src: 'playas-y-calas-tossa-de-mar.png', dest: 'plages-et-criques-tossa-de-mar.png' }
  },
  'tossa-con-ninos': {
    es: { src: 'tossa-con-niños-familia.png', dest: 'tossa-con-ninos-familia.png' },
    ca: { src: 'tossa-con-niños-familia.png', dest: 'tossa-amb-nens-familia-ca.png' },
    en: { src: 'tossa-con-niños-familia.png', dest: 'tossa-with-kids-family.png' },
    fr: { src: 'tossa-con-niños-familia.png', dest: 'tossa-avec-enfants-famille.png' }
  },
  'senderismo-tossa': {
    es: { src: 'senderismo-tossa-camino-ronda.png', dest: 'senderismo-tossa-camino-ronda.png' },
    ca: { src: 'senderismo-tossa-camino-ronda.png', dest: 'senderisme-tossa-cami-de-ronda-ca.png' },
    en: { src: 'senderismo-tossa-camino-ronda.png', dest: 'hiking-tossa-cami-de-ronda.png' },
    fr: { src: 'senderismo-tossa-camino-ronda.png', dest: 'randonnee-tossa-chemin-de-ronde.png' }
  }
};

const contentEs = {
  'guia-tossa-de-mar': `Tossa de Mar, conocida a menudo como la "Perla de la Costa Brava", es sin duda uno de los destinos más mágicos y pintorescos de toda Cataluña. Su recinto amurallado, el único ejemplo de población medieval fortificada que todavía se conserva en la costa catalana, enamora a todos sus visitantes. Si te preguntas qué ver en Tossa de Mar, esta guía es tu punto de partida ideal para unas vacaciones inolvidables.

Desde El Bergantí & Hostalet, situados en pleno corazón del pueblo, queremos compartir contigo nuestra perspectiva local. 

## 1. La Vila Vella y el Castillo de Tossa
El recinto amurallado de la <a href="https://www.google.com/maps/search/Vila+Vella+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Vila Vella</a> es el emblema indiscutible. Pasear por sus estrechas y empinadas calles empedradas te transportará directamente a la época medieval. Las imponentes murallas, construidas entre los siglos XII y XIV para proteger a la población local, ofrecen hoy en día unas vistas panorámicas impresionantes al mar Mediterráneo.

*Consejo local:* Te recomendamos subir al atardecer para disfrutar de una de las mejores puestas de sol. Para profundizar en la historia y ver mapas interactivos de la zona, te recomendamos explorar la <a href="https://www.infotossa.com/es/" target="_blank" rel="noopener noreferrer">Guía Oficial de Visit Tossa</a>, que contiene todos los recursos exhaustivos del municipio.

## 2. El Faro de Tossa y la Villa Romana
Coronando el casco antiguo se encuentra el <a href="https://www.google.com/maps/search/Faro+de+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Faro de Tossa</a>. Desde aquí obtendrás las mejores panorámicas de la escarpada costa. Si te apasiona la historia antigua, no te pierdas la <a href="https://www.google.com/maps/search/Villa+Romana+dels+Ametllers" target="_blank" rel="noopener noreferrer">Villa Romana dels Ametllers</a>, un yacimiento arqueológico fascinante en pleno núcleo urbano.

### Dónde alojarse
Para disfrutar al máximo, la ubicación es clave. Tras un largo día explorando, no hay nada mejor que descansar cerca de la playa. Conoce nuestras comodidades en <a href="https://www.hostalhostalet.com/es/" target="_blank" rel="noopener noreferrer">El Hostalet</a>, diseñado para ofrecerte el mejor confort en el centro.`,
  
  'que-comer-tossa': `La gastronomía de Tossa de Mar está profundamente ligada al mar y a las tradiciones marineras de la Costa Brava. Si buscas los mejores restaurantes en Tossa de Mar y los platos típicos durante tu estancia, la cocina local destaca por el uso de ingredientes frescos de la lonja.

## El plato estrella: Cim i Tomba
No puedes visitar Tossa sin probar el histórico <a href="https://es.wikipedia.org/wiki/Cim_i_tomba" target="_blank" rel="noopener noreferrer">Cim i Tomba</a>. Su origen se remonta a los antiguos pescadores locales, que al salir a faenar preparaban este guiso de supervivencia en sus propias barcas. Se elabora con pescado de roca, patatas, cebolla, ajo, tomate y se culmina con un alioli suave que le da un sabor inconfundible. Varios locales centenarios del pueblo, como el <a href="https://www.restaurantminerva.com/" target="_blank" rel="noopener noreferrer">Restaurant Minerva</a>, son famosos por su dedicación a este guiso marinero tradicional.

## Tapas, Mariscos y Arroces
Los arroces marineros, las fideuás y las parrilladas de marisco fresco son opciones que nunca fallan frente al mar. Para los amantes del picoteo, las tapas de anchoas de L'Escala, los calamares a la romana y el clásico "pa amb tomàquet" son obligatorios en cualquier terraza.

## Restaurante de Tapas El Bergantí
Si te apetece probar la auténtica gastronomía local de tapeo sin moverte del centro, en el <a href="https://elberganti-tossa.com/es/restaurante/" target="_blank" rel="noopener noreferrer">Restaurante El Bergantí</a> preparamos a diario nuestras especialidades y tapas tradicionales. Un ambiente cercano y familiar ideal para disfrutar de una cena mediterránea tras un intenso día de playa.`,

  'directorio-util-tossa': `Para que tus vacaciones en la Costa Brava sean lo más cómodas posible, hemos preparado este directorio útil y de información práctica de Tossa de Mar. Guarda esta página en tus favoritos para tener siempre a mano los servicios indispensables.

## 🛒 Supermercados y Alimentación
Tossa cuenta con excelentes opciones para abastecerte:
- <a href="https://www.google.com/maps/search/Esclat+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Esclat / Bon Preu</a>: El supermercado más grande, situado a la entrada del pueblo, ideal para grandes compras.
- <a href="https://www.google.com/maps/search/Caprabo+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Caprabo</a>: Muy céntrico, ubicado cerca de la estación de autobuses.

## 🏥 Farmacias y Asistencia Médica
Si viajas en familia, es vital tener localizada la asistencia médica:
- <a href="https://www.google.com/maps/search/CAP+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">CAP Tossa de Mar</a>: Es el centro de atención primaria de la red de Salut de Catalunya para urgencias médicas.
- **Farmacias:** Dispones de varias en el centro peatonal, destacando la histórica Farmàcia Doria.

## 🅿️ Aparcamiento y Transporte (Moventis)
El aparcamiento en Tossa puede ser complejo en pleno mes de agosto. 
- Te recomendamos aparcar en el <a href="https://www.google.com/maps/search/Aparcamiento+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Aparcamiento Municipal de Tossa</a> (zona azul cerca de la terminal) y moverte a pie.
- Si prefieres el transporte público, Tossa está excelentemente conectada. Consulta los horarios de autobuses y rutas en la <a href="https://www.moventis.es/es/search/node/tossa%20de%20mar%20language%3Aes" target="_blank" rel="noopener noreferrer">búsqueda oficial de Moventis para Tossa de Mar</a>.`,

  'playas-calas-tossa': `El litoral de Tossa esconde algunas de las mejores playas de la Costa Brava. Con aguas turquesas y arenas doradas, es un verdadero paraíso para los amantes de la naturaleza y el buceo.

## 🏖️ Playas del Casco Urbano
Si buscas comodidad, chiringuitos y no coger el coche:
- <a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a>: Es la playa principal y más icónica, vigilada directamente por el castillo medieval. Es perfecta para alquilar patinetes de agua o simplemente nadar con la historia de fondo.
- <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>: Situada al otro extremo de la bahía. Cuenta con un pequeño rincón cerrado conocido como "la bañera de las mujeres", ideal para familias con niños que buscan aguas extremadamente tranquilas, y es el punto de inmersión por excelencia para buceadores.

## 🌲 Calas Escondidas
Para un entorno más salvaje y rodeado de naturaleza mediterránea:
- <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>: A tan solo unos kilómetros, es una joya encajada entre acantilados de roca y pinos, muy famosa por su camping colindante. El acceso suele ser caminando a través del tramo de bosque desde la carretera.
- <a href="https://www.google.com/maps/search/Cala+Giverola" target="_blank" rel="noopener noreferrer">Cala Giverola</a>: Cuenta con servicios y es accesible de forma muy divertida mediante los tradicionales barcos con fondo de cristal que salen de la Platja Gran.
- <a href="https://www.google.com/maps/search/Cala+Futadera" target="_blank" rel="noopener noreferrer">Cala Futadera</a>: Para los más aventureros, esta cala salvaje (a la que se desciende por unas largas escaleras) no tiene ningún tipo de servicio, pero su agua turquesa y virgen te dejará sin aliento.

Para más información institucional, puedes revisar el estado del mar en <a href="https://costabrava.org/es/" target="_blank" rel="noopener noreferrer">Turismo de la Costa Brava</a>.`,

  'tossa-con-ninos': `Pasar unas vacaciones en Tossa de Mar con niños es una de las opciones familiares más recomendables de toda la Costa Brava. A diferencia de otras poblaciones vecinas más enfocadas al ocio nocturno, Tossa mantiene un ambiente seguro, relajado y lleno de actividades para los más pequeños.

## Playas seguras y cómodas
<a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a> cuenta con aguas limpias y servicios de socorrismo completos. Una gran ventaja de Tossa es su tipo de arena (granulada). A diferencia de la arena fina, no se pega excesivamente a la piel ni vuela con el viento, lo que facilita enormemente la logística y la limpieza al finalizar el día de playa.

## Aventuras y Actividades Infantiles
- **El Trenecito Turístico (Carrilet):** Una actividad imprescindible. A los niños les encanta subir al tren que recorre el pueblo y asciende hasta el Faro, evitándoles la dura subida a pie.
- **Barcos con Visión Submarina:** Salen constantemente desde la playa. Es una forma fantástica para que los niños observen la vida marina sin mojarse. Descubre más sobre estas excursiones a las cuevas en <a href="https://www.fondocristal.com/es/" target="_blank" rel="noopener noreferrer">Fondo de Cristal Tossa</a>.

## Descanso en el centro peatonal
El casco antiguo peatonal es perfecto para pasear al atardecer mientras disfrutan de un helado artesanal. Para que la familia esté cómoda, alojarte en <a href="https://www.hostalhostalet.com/es/" target="_blank" rel="noopener noreferrer">El Hostalet</a>, a pie de calle en pleno centro, os permitirá ir y volver a la playa caminando en pocos minutos sin cargar bultos por pendientes pronunciadas.`,

  'senderismo-tossa': `Para los apasionados de la naturaleza y el trekking, la ruta del Camí de Ronda en Tossa de Mar es sencillamente espectacular. Esta antigua ruta, usada históricamente por carabineros para vigilar el contrabando, bordea hoy el litoral ofreciendo vistas aéreas de acantilados y calas vírgenes.

## Ruta Norte: De Tossa a Cala Pola
Una excursión muy popular y hermosa que parte desde la <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>. El sendero asciende rápidamente ofreciendo vistas inmejorables de la bahía. Caminarás bajo frondosos bosques de pinos mediterráneos hasta llegar a la preciosa <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>, donde podrás darte un merecido chapuzón.

Para tu seguridad, te recomendamos descargar el track GPS oficial directamente desde <a href="https://es.wikiloc.com/rutas/senderismo/espana/catalunya/tossa-de-mar" target="_blank" rel="noopener noreferrer">Wikiloc (Rutas en Tossa)</a> para no perderte las bifurcaciones correctas.

## Ruta Sur: De Tossa a Lloret de Mar
Para los más experimentados, la ruta hacia el sur es más larga y exigente. Atraviesa un denso macizo montañoso, pasando por el impresionante Mirador des Cars y descendiendo hacia playas solitarias como <a href="https://www.google.com/maps/search/Cala+Morisca+Tossa" target="_blank" rel="noopener noreferrer">Cala Morisca</a>. 

### Consejos para el senderista
Evita las horas centrales del día en verano, lleva calzado con buen agarre (algunos tramos tienen desniveles pronunciados) y agua abundante. Tras finalizar tu aventura por los senderos, el <a href="https://elberganti-tossa.com/es/restaurante/" target="_blank" rel="noopener noreferrer">Restaurante El Bergantí</a> os espera con las mejores tapas para reponer fuerzas en el mejor ambiente.`
};

const contentCa = {
  'guia-tossa-de-mar': `Tossa de Mar, coneguda sovint com la "Perla de la Costa Brava", és sens dubte un dels destins més màgics i pintorescs de tota Catalunya. El seu recinte emmurallat, l'únic exemple de població medieval fortificada que encara es conserva a la costa catalana, enamora tots els seus visitants. Si et preguntes què veure a Tossa de Mar, aquesta guia és el teu punt de partida ideal per a unes vacances inoblidables.

Des de El Bergantí & Hostalet, situats en ple cor del poble, volem compartir amb tu la nostra perspectiva local.

## 1. La Vila Vella i el Castell de Tossa
El recinte emmurallat de la <a href="https://www.google.com/maps/search/Vila+Vella+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Vila Vella</a> és l'emblema indiscutible. Passejar pels seus estrets i costeruts carrers empedrats et transportarà directament a l'època medieval. Les imponentes muralles, construïdes entre els segles XII i XIV per protegir la població local, ofereixen avui en dia unes vistes panoràmiques impressionants al mar Mediterráneo.

*Consell local:* Et recomanem pujar al capvespre per gaudir d'una de les millors postes de sol. Per aprofundir en la història i veure mapes interactius de la zona, et recomanem explorar la <a href="https://www.infotossa.com/ca/" target="_blank" rel="noopener noreferrer">Guia Oficial de Visit Tossa</a>.

## 2. El Far de Tossa i la Vil·la Romana
Coronant el nucli antic es troba el <a href="https://www.google.com/maps/search/Faro+de+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Far de Tossa</a>. Des d'aquí obtindràs les millors panoràmiques de la costa. Si t'apassiona la història antiga, no et perdis la <a href="https://www.google.com/maps/search/Villa+Romana+dels+Ametllers" target="_blank" rel="noopener noreferrer">Vil·la Romana dels Ametllers</a>, un jaciment arqueològic fascinant en ple nucli urbà.

### On allotjar-se
Per gaudir al màxim, la ubicació és clau. Després d'un llarg dia explorant, no hi ha res millor que descansar a prop de la platja. Coneix les nostres comoditats a <a href="https://www.hostalhostalet.com/es/" target="_blank" rel="noopener noreferrer">L'Hostalet</a>, dissenyat per oferir-te el millor confort al centre.`,
  
  'que-comer-tossa': `La gastronomia de Tossa de Mar està profundament lligada al mar i a les tradicions marineres de la Costa Brava. Si busques els millors restaurants a Tossa de Mar i els plats típics durant la teva estada, la cuina local destaca per l'ús d'ingredients frescos de la llotja.

## El plat estrella: Cim i Tomba
No pots visitar Tossa sense provar l'històric <a href="https://ca.wikipedia.org/wiki/Cim_i_tomba" target="_blank" rel="noopener noreferrer">Cim i Tomba</a>. El seu origen es remunta als antics pescadors locals. S'elabora amb peix de roca, patates, ceba, all, tomàquet i es culmina amb un allioli suau. Diversos locals centenaris del poble, com el <a href="https://www.restaurantminerva.com/" target="_blank" rel="noopener noreferrer">Restaurant Minerva</a>, són famosos per la seva dedicació a aquest guisat mariner tradicional.

## Tapes, Mariscos i Arrossos
Els arrossos mariners, les fideuades i les graellades de marisc fresc són opcions que mai fallen davant del mar. Per als amants del pica-pica, les tapes d'anxoves de L'Escala, els calamars a la romana i el clàssic "pa amb tomàquet" són obligatoris.

## Restaurant de Tapes El Bergantí
Si et ve de gust provar l'autèntica gastronomia local de tapes sense moure't del centre, al <a href="https://elberganti-tossa.com/es/restaurante/" target="_blank" rel="noopener noreferrer">Restaurant El Bergantí</a> preparem diàriament les nostres especialitats i tapes tradicionals.`,

  'directorio-util-tossa': `Perquè les teves vacances a la Costa Brava siguin el més còmodes possible, hem preparat aquest directori útil i d'informació pràctica de Tossa de Mar. Guarda aquesta pàgina per tenir sempre a mà els serveis indispensables.

## 🛒 Supermercats i Alimentación
- <a href="https://www.google.com/maps/search/Esclat+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Esclat / Bon Preu</a>: El supermercat més gran, situat a l'entrada del poble.
- <a href="https://www.google.com/maps/search/Caprabo+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Caprabo</a>: Molt cèntric, ubicat a prop de l'estació d'autobusos.

## 🏥 Farmàcies i Assistència Mèdica
- <a href="https://www.google.com/maps/search/CAP+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">CAP Tossa de Mar</a>: És el centre d'atenció primària de la xarxa de Salut de Catalunya per a urgències mèdiques.
- **Farmàcies:** Disposes de diverses al centre de vianants, destacant la històrica Farmàcia Doria.

## 🅿️ Aparcament i Transport (Moventis)
- Et recomanem aparcar a l'<a href="https://www.google.com/maps/search/Aparcamiento+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Aparcament Municipal de Tossa</a> (zona blava prop de la terminal) i moure't a peu.
- Si prefereixes el transport públic, consulta els horaris d'autobusos a la <a href="https://www.moventis.es/ca/search/node/tossa%20de%20mar%20language%3Aca" target="_blank" rel="noopener noreferrer">cerca oficial de Moventis per Tossa de Mar</a>.`,

  'playas-calas-tossa': `El litoral de Tossa amaga algunes de les millors platges de la Costa Brava. Amb aigües turqueses i sorres daurades, és un veritable paradís per als amants de la natura i el busseig.

## 🏖️ Platges del Nucli Urbà
- <a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a>: És la platja principal i més icònica, vigilada directament pel castell medieval.
- <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>: Situada a l'altre extrem de la badia. Compta amb un petit racó tancat conegut com "la banyera de las dones", ideal per a famílies amb nens.

## 🌲 Cales Amagades
- <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>: A tan sols uns quilòmetres, és una joia encaixada entre penya-segats de roca i pins.
- <a href="https://www.google.com/maps/search/Cala+Giverola" target="_blank" rel="noopener noreferrer">Cala Giverola</a>: Accessible de forma molt divertida mitjançant els tradicionals vaixells amb fons de vidre.
- <a href="https://www.google.com/maps/search/Cala+Futadera" target="_blank" rel="noopener noreferrer">Cala Futadera</a>: Per als més aventurers, aquesta cala salvatge no té cap tipus de servei, però la seva aigua turquesa et deixarà sense alè.

Pots revisar l'estat del mar a <a href="https://costabrava.org/ca/" target="_blank" rel="noopener noreferrer">Turisme de la Costa Brava</a>.`,

  'tossa-con-ninos': `Passar unes vacances a Tossa de Mar amb nens és una de les opcions familiars més recomanables de tota la Costa Brava. Tossa manté un ambient segur, relaxat i ple d'activitats per als més petits.

## Platges segures i còmodes
<a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a> compta amb aigües netes i serveis de socorrisme. Una gran avantatge de Tossa és el seu tipus de sorra (granulada) que no s'enganxa excessivament a la pell.

## Aventures i Activitats Infantiles
- **El Trenet Turístic (Carrilet):** Una activitat imprescindible. Als nens els encanta pujar al tren que recorre el poble.
- **Vaixells amb Visió Submarina:** Descobreix més sobre aquestes excursions a les coves a <a href="https://www.fondocristal.com/ca/" target="_blank" rel="noopener noreferrer">Fons de Cristall Tossa</a>.

## Descans al centre de vianants
Allotjar-te a <a href="https://www.hostalhostalet.com/es/" target="_blank" rel="noopener noreferrer">L'Hostalet</a>, a peu de carrer en ple centre, us permetrà anar i tornar a la platja caminant en pocs minuts.`,

  'senderismo-tossa': `Per als apassionats de la natura i el trekking, la ruta del Camí de Ronda a Tossa de Mar és sencillamente espectacular. 

## Ruta Nord: De Tossa a Cala Pola
Una excursió molt popular que parteix des de la <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>. El sender ascendeix ràpidament oferint vistes immillorables de la badia fins arribar a la preciosa <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>.

Descarrega el track GPS oficial directament des de <a href="https://es.wikiloc.com/rutas/senderismo/espana/catalunya/tossa-de-mar" target="_blank" rel="noopener noreferrer">Wikiloc (Rutes a Tossa)</a>.

## Ruta Sud: De Tossa a Lloret de Mar
Una ruta cap al sud, més llarga i exigent, passant pel Mirador des Cars i descendint cap a platges solitàries com <a href="https://www.google.com/maps/search/Cala+Morisca+Tossa" target="_blank" rel="noopener noreferrer">Cala Morisca</a>. 

Després de la teva aventura, el <a href="https://elberganti-tossa.com/es/restaurante/" target="_blank" rel="noopener noreferrer">Restaurant El Bergantí</a> us espera amb les millors tapes per recuperar forces.`
};

const contentEn = {
  'guia-tossa-de-mar': `Tossa de Mar, often known as the "Pearl of the Costa Brava", is undoubtedly one of the most magical destinations in Catalonia. Its walled enclosure, the only preserved fortified medieval town on the Catalan coast, enchants all its visitors. If you wonder what to see in Tossa de Mar, this guide is your ideal starting point for an unforgettable holiday.

From El Bergantí & Hostalet, located in the heart of town, we want to share our local perspective.

## 1. La Vila Vella and Tossa Castle
The walled enclosure of the <a href="https://www.google.com/maps/search/Vila+Vella+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Vila Vella</a> is the undisputed emblem. Walking through its narrow, steep cobbled streets transports you directly to medieval times.

*Local tip:* We highly recommend climbing up at sunset. For historical context, visit the <a href="https://www.infotossa.com/en" target="_blank" rel="noopener noreferrer">Official Tossa de Mar Tourism Office</a>.

## 2. The Lighthouse and Roman Villa
Crowning the old town is the <a href="https://www.google.com/maps/search/Faro+de+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Tossa Lighthouse</a>. From here you get the best panoramic views. If you love ancient history, don't miss the <a href="https://www.google.com/maps/search/Villa+Romana+dels+Ametllers" target="_blank" rel="noopener noreferrer">Roman Villa dels Ametllers</a>.

### Where to stay
To fully enjoy this experience, location is key. After a long day of sightseeing, we invite you to discover our rooms at <a href="https://www.hostalhostalet.com/en/" target="_blank" rel="noopener noreferrer">El Hostalet</a>, designed to offer the best comfort right in the center.`,

  'que-comer-tossa': `Tossa's gastronomy is deeply linked to the sea and the maritime traditions of the Costa Brava. 

## The Star Dish: Cim i Tomba
You cannot visit without trying <a href="https://en.wikipedia.org/wiki/Cim_i_tomba" target="_blank" rel="noopener noreferrer">Cim i Tomba</a>, the town's traditional dish par excellence. Century-old places like <a href="https://www.restaurantminerva.com/" target="_blank" rel="noopener noreferrer">Restaurant Minerva</a> are famous for this dish.

## Tapas, Seafood, and Rice Dishes
Seafood rice dishes and fresh grilled seafood never fail. For snacking, L'Escala anchovy tapas and Roman-style squid are mandatory.

## El Bergantí Tapas Restaurant
If you want to taste authentic local gastronomy without leaving the center, <a href="https://elberganti-tossa.com/en/restaurant/" target="_blank" rel="noopener noreferrer">El Bergantí Restaurant</a> prepares traditional specialties and tapas daily.`,

  'directorio-util-tossa': `To make your holidays as comfortable as possible, we have prepared this useful directory of Tossa de Mar. Keep this page handy for the most important services and their exact locations.

## 🛒 Supermarkets
- <a href="https://www.google.com/maps/search/Esclat+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Esclat / Bon Preu</a>: The largest supermarket at the town entrance.
- <a href="https://www.google.com/maps/search/Caprabo+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Caprabo</a>: Very central, located near the bus station.

## 🏥 Pharmacies and Medical Assistance
- <a href="https://www.google.com/maps/search/CAP+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">CAP Tossa de Mar</a>: The primary care center for medical emergencies.
- **Pharmacies:** There are several in the pedestrian center, notably Farmàcia Doria.

## 🅿️ Parking and Transportation (Moventis)
- We recommend parking at the <a href="https://www.google.com/maps/search/Aparcamiento+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Municipal Parking</a> (blue zone near the terminal) and walking.
- Check bus schedules on the <a href="https://www.moventis.es/en/search/node/tossa%20de%20mar%20language%3Aen" target="_blank" rel="noopener noreferrer">official Moventis search page</a>.`,

  'playas-calas-tossa': `Tossa's coastline hides some of the best beaches on the Costa Brava. With turquoise waters and golden sands, it's a true paradise for diving lovers.

## 🏖️ Urban Beaches
- <a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a>: The main beach, watched over directly by the medieval castle.
- <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>: Located at the other end of the bay. It has a small enclosed corner known as "the women's bathtub".

## 🌲 Hidden Coves
- <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>: About 4 kilometers away, wedged between cliffs.
- <a href="https://www.google.com/maps/search/Cala+Giverola" target="_blank" rel="noopener noreferrer">Cala Giverola</a>: Accessible via the traditional glass-bottom boats departing from Platja Gran.
- <a href="https://www.google.com/maps/search/Cala+Futadera" target="_blank" rel="noopener noreferrer">Cala Futadera</a>: For the more adventurous, this wild cove requires descending a long staircase.

Check local beach certifications on the official <a href="https://costabrava.org/en/" target="_blank" rel="noopener noreferrer">Costa Brava Tourism</a> portal.`,

  'tossa-con-ninos': `Spending holidays in Tossa de Mar with kids is one of the most highly recommended family options on the Costa Brava. 

## Safe Beaches
<a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a> has calm, clean waters. A great advantage is the coarse sand, which doesn't stick to the skin.

## Kids Activities
- **The Tourist Train (Carrilet):** An absolute must. Children love riding the train up to the Lighthouse.
- **Glass-Bottom Boats:** Discover more about exploring sea caves at <a href="https://www.fondocristal.com/en/" target="_blank" rel="noopener noreferrer">Fondo de Cristal Tossa</a>.

## Strolling the Pedestrian Center
Staying at <a href="https://www.hostalhostalet.com/en/" target="_blank" rel="noopener noreferrer">El Hostalet</a> right in the center allows you to walk to the beach in minutes.`,

  'senderismo-tossa': `For nature and trekking lovers, the Camí de Ronda route in Tossa is one of the most spectacular hiking trails on the Costa Brava. 

## Northern Route: To Cala Pola
A popular and beautiful hike starting from <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>. The trail climbs quickly under lush Mediterranean pine forests until you reach the beautiful <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>.

To ensure safety, download the official GPS tracks from <a href="https://es.wikiloc.com/rutas/senderismo/espana/catalunya/tossa-de-mar" target="_blank" rel="noopener noreferrer">Wikiloc</a>.

## Southern Route: To Lloret de Mar
A longer, more demanding route through the mountain massif. It descends to solitary beaches like <a href="https://www.google.com/maps/search/Cala+Morisca+Tossa" target="_blank" rel="noopener noreferrer">Cala Morisca</a>. 

After your adventure, <a href="https://elberganti-tossa.com/en/restaurant/" target="_blank" rel="noopener noreferrer">El Bergantí Restaurant</a> awaits with the best local tapas to recover your strength.`
};

const contentFr = {
  'guia-tossa-de-mar': `Tossa de Mar, souvent appelée la "Perla de la Costa Brava", est sans aucun doute l'une des destinations les plus magiques de Catalogne. Son enceinte fortifiée, le seul exemple de ville médiévale fortifiée préservé sur la côte catalane, enchante tous ses visiteurs. 

## 1. La Vila Vella et le Château de Tossa
L'enceinte fortifiée de la <a href="https://www.google.com/maps/search/Vila+Vella+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Vila Vella</a> est l'emblème incontesté. Se promener dans ses ruelles pavées vous transporte directement à l'époque médiévale. 

Pour plus de contexte historique, visitez l'<a href="https://www.infotossa.com/fr" target="_blank" rel="noopener noreferrer">Office de Tourisme Officiel de Tossa de Mar</a>.

## 2. Le Phare et la Villa Romaine
Couronnant la vieille ville se trouve le <a href="https://www.google.com/maps/search/Faro+de+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Phare de Tossa</a>. D'ici, vous obtenez les meilleures vues panoramiques. Ne manquez pas la <a href="https://www.google.com/maps/search/Villa+Romana+dels+Ametllers" target="_blank" rel="noopener noreferrer">Villa Romaine dels Ametllers</a>.

### Où séjourner
Pour profiter pleinement de cette expérience, l'emplacement est clé. Après une longue journée de visites, nous vous invitons à découvrir nos chambres à <a href="https://www.hostalhostalet.com/fr/" target="_blank" rel="noopener noreferrer">El Hostalet</a>.`,

  'que-comer-tossa': `La gastronomie de Tossa est profondément liée à la mer et aux traditions maritimes de la Costa Brava. 

## Le Plat Vedette : Cim i Tomba
Vous ne pouvez pas visiter sans essayer le <a href="https://fr.wikipedia.org/wiki/Cim_i_tomba" target="_blank" rel="noopener noreferrer">Cim i Tomba</a>, le plat traditionnel de la ville par excellence. Des endroits centenaires comme le <a href="https://www.restaurantminerva.com/" target="_blank" rel="noopener noreferrer">Restaurant Minerva</a> sont célèbres pour ce plat.

## Restaurant de Tapas El Bergantí
Si vous voulez goûter la véritable gastronomie locale sans quitter le centre, le <a href="https://elberganti-tossa.com/fr/restaurant/" target="_blank" rel="noopener noreferrer">Restaurant El Bergantí</a> prépare chaque jour des spécialités traditionnelles et des tapas.`,

  'directorio-util-tossa': `Pour rendre vos vacances aussi confortables que possible, nous avons préparé ce répertoire utile de Tossa de Mar. 

## 🛒 Supermarchés
- <a href="https://www.google.com/maps/search/Esclat+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Esclat / Bon Preu</a> : Le plus grand supermarché à l'entrée de la ville.
- <a href="https://www.google.com/maps/search/Caprabo+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Caprabo</a> : Très central, situé près de la gare routière.

## 🏥 Pharmacies et Assistance Médicale
- <a href="https://www.google.com/maps/search/CAP+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">CAP Tossa de Mar</a> : Le centre de soins primaires pour les urgences médicales.

## 🅿️ Parking et Transports (Moventis)
- Nous recommandons de vous garer au <a href="https://www.google.com/maps/search/Aparcamiento+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Parking Municipal</a> (zone bleue).
- Consultez les horaires de bus sur la <a href="https://www.moventis.es/fr/search/node/tossa%20de%20mar%20language%3Afr" target="_blank" rel="noopener noreferrer">page de recherche officielle de Moventis</a>.`,

  'playas-calas-tossa': `Le littoral de Tossa cache quelques-unes des meilleures plages de la Costa Brava. 

## 🏖️ Plages Urbaines
- <a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a> : La plage principale, surveillée directement par le château médiéval.
- <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a> : Située à l'autre bout de la baie. Idéale pour les familles.

## 🌲 Criques Cachées
- <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a> : À environ 4 kilomètres, coincée entre les falaises.
- <a href="https://www.google.com/maps/search/Cala+Giverola" target="_blank" rel="noopener noreferrer">Cala Giverola</a> : Accessible via les bateaux à fond de verre traditionnels.

Vérifiez les certifications locales sur le portail officiel du <a href="https://costabrava.org/fr/" target="_blank" rel="noopener noreferrer">Tourisme de la Costa Brava</a>.`,

  'tossa-con-ninos': `Passer des vacances à Tossa de Mar avec des enfants est l'une des options familiales les plus recommandées sur la Costa Brava. 

## Plages Sûres
<a href="https://www.google.com/maps/search/Platja+Gran+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">La Platja Gran</a> a des eaux calmes et propres. Un grand avantage est le sable grossier, qui ne colle pas à la peau.

## Activités pour Enfants
- **Le Petit Train Touristique (Carrilet) :** Les enfants adorent monter dans le train jusqu'au Phare.
- **Bateaux à Fond de Verre :** Découvrez-en plus sur <a href="https://www.fondocristal.com/fr/" target="_blank" rel="noopener noreferrer">Fondo de Cristal Tossa</a>.

## Séjourner au Centre
Séjourner à <a href="https://www.hostalhostalet.com/fr/" target="_blank" rel="noopener noreferrer">El Hostalet</a> en plein centre vous permet de marcher jusqu'à la plage en quelques minutes.`,

  'senderismo-tossa': `Pour les amateurs de nature et de trekking, la route du Camí de Ronda à Tossa est l'un des sentiers de randonnée les plus spectaculaires de la Costa Brava. 

## Route Nord : Vers Cala Pola
Une belle randonnée commençant par <a href="https://www.google.com/maps/search/Platja+de+la+Mar+Menuda" target="_blank" rel="noopener noreferrer">Platja de la Mar Menuda</a>. Le sentier grimpe rapidement jusqu'à la magnifique <a href="https://www.google.com/maps/search/Cala+Pola+Tossa+de+Mar" target="_blank" rel="noopener noreferrer">Cala Pola</a>.

Pour assurer votre sécurité, téléchargez les pistes GPS officielles sur <a href="https://es.wikiloc.com/rutas/senderismo/espana/catalunya/tossa-de-mar" target="_blank" rel="noopener noreferrer">Wikiloc</a>.

## Route Sud : Vers Lloret de Mar
Une route plus longue et plus exigeante qui descend vers des plages solitaires comme <a href="https://www.google.com/maps/search/Cala+Morisca+Tossa" target="_blank" rel="noopener noreferrer">Cala Morisca</a>. 

Après votre aventure, le <a href="https://elberganti-tossa.com/fr/restaurant/" target="_blank" rel="noopener noreferrer">Restaurant El Bergantí</a> vous attend avec les meilleures tapas locales pour récupérer vos forces.`
};

const config = {
  'guia-tossa-de-mar': {
    es: { title: "Guía Completa de Tossa de Mar: Qué Ver y Hacer", desc: "Descubre la Vila Vella, el faro y las mejores actividades en Tossa de Mar.", cat: "Guía de Viaje", keywords: ["qué ver en tossa de mar", "guía tossa de mar", "pueblos medievales costa brava", "vila vella tossa"] },
    ca: { title: "Guia Completa de Tossa de Mar: Què Veure i Fer", desc: "Descobreix la Vila Vella, el far i les millors activitats a Tossa de Mar.", cat: "Guia de Viatge", keywords: ["què veure a tossa de mar", "guia tossa de mar", "pobles medievals costa brava", "vila vella tossa"] },
    en: { title: "Complete Guide to Tossa de Mar: Things to See and Do", desc: "Discover Vila Vella, the lighthouse, and the best activities in Tossa de Mar.", cat: "Travel Guide", keywords: ["what to see in tossa de mar", "tossa de mar guide", "medieval towns costa brava", "vila vella tossa"] },
    fr: { title: "Guide Complet de Tossa de Mar : Que Voir et Faire", desc: "Découvrez Vila Vella, le phare et les meilleures activités à Tossa de Mar.", cat: "Guide de Voyage", keywords: ["que voir à tossa de mar", "guide tossa de mar", "villages médiévaux costa brava", "vila vella tossa"] }
  },
  'que-comer-tossa': {
    es: { title: "Los Mejores Restaurantes en Tossa y Qué Comer (Cim i Tomba)", desc: "Desde el Cim i Tomba hasta las tapas. Encuentra los mejores restaurantes en Tossa de Mar.", cat: "Gastronomía", keywords: ["mejores restaurantes en tossa de mar", "qué comer en tossa", "restaurantes con encanto tossa de mar", "cim i tomba receta"] },
    ca: { title: "Els Millors Restaurants a Tossa i Què Menjar (Cim i Tomba)", desc: "Des del Cim i Tomba fins a les tapes. Troba els millors restaurants a Tossa de Mar.", cat: "Gastronomia", keywords: ["millors restaurants a tossa de mar", "què menjar a tossa", "restaurants amb encant tossa de mar", "cim i tomba recepta"] },
    en: { title: "The Best Restaurants in Tossa and What to Eat (Cim i Tomba)", desc: "From Cim i Tomba to tapas. Find the best restaurants in Tossa de Mar.", cat: "Gastronomy", keywords: ["best restaurants in tossa de mar", "what to eat in tossa", "charming restaurants tossa de mar", "cim i tomba recipe"] },
    fr: { title: "Les Meilleurs Restaurants à Tossa et Que Manger (Cim i Tomba)", desc: "Du Cim i Tomba aux tapas. Trouvez les meilleurs restaurants à Tossa de Mar.", cat: "Gastronomie", keywords: ["meilleurs restaurants à tossa de mar", "que manger à tossa", "restaurants de charme tossa de mar", "cim i tomba recette"] }
  },
  'directorio-util-tossa': {
    es: { title: "Información Útil Tossa de Mar: Autobuses, Farmacias y Mapas", desc: "Toda la información útil de Tossa de Mar: horarios de autobuses Moventis, supermercados y atención médica.", cat: "Información Útil", keywords: ["información útil tossa de mar", "autobuses tossa de mar moventis", "farmacias tossa de mar", "supermercado esclat tossa"] },
    ca: { title: "Informació Útil Tossa de Mar: Autobusos, Farmàcies i Mapes", desc: "Tota la informació útil de Tossa de Mar: horaris d'autobusos Moventis, supermercats i atenció mèdica.", cat: "Informació Útil", keywords: ["informació útil tossa de mar", "autobusos tossa de mar moventis", "farmàcies tossa de mar", "supermercat esclat tossa"] },
    en: { title: "Useful Information Tossa de Mar: Buses, Pharmacies and Maps", desc: "All the useful information for Tossa de Mar: Moventis bus schedules, supermarkets, and medical care.", cat: "Useful Info", keywords: ["useful information tossa de mar", "moventis buses tossa de mar", "pharmacies tossa de mar", "esclat supermarket tossa"] },
    fr: { title: "Informations Utiles Tossa de Mar : Bus, Pharmacies et Cartes", desc: "Toutes les informations utiles de Tossa de Mar : horaires des bus Moventis, supermarchés et soins médicaux.", cat: "Infos Pratiques", keywords: ["informations utiles tossa de mar", "bus moventis tossa de mar", "pharmacies tossa de mar", "supermarché esclat tossa"] }
  },
  'playas-calas-tossa': {
    es: { title: "Las Mejores Playas de la Costa Brava y Calas en Tossa", desc: "Descubre las calas escondidas como Cala Pola y las mejores playas de la Costa Brava en Tossa.", cat: "Playas", keywords: ["mejores playas de la costa brava", "calas escondidas tossa de mar", "playa gran tossa", "cala pola tossa"] },
    ca: { title: "Les Millors Platges de la Costa Brava i Cales a Tossa", desc: "Descobreix les cales amagades com Cala Pola i les millors platges de la Costa Brava a Tossa.", cat: "Platges", keywords: ["millors platges de la costa brava", "cales amagades tossa de mar", "platja gran tossa", "cala pola tossa"] },
    en: { title: "The Best Beaches on the Costa Brava and Coves in Tossa", desc: "Discover hidden coves like Cala Pola and the best beaches on the Costa Brava in Tossa.", cat: "Beaches", keywords: ["best beaches costa brava", "hidden coves tossa de mar", "platja gran tossa", "cala pola tossa"] },
    fr: { title: "Les Meilleures Plages de la Costa Brava et Criques à Tossa", desc: "Découvrez des criques cachées comme Cala Pola et les meilleures plages de la Costa Brava à Tossa.", cat: "Plages", keywords: ["meilleures plages costa brava", "criques cachées tossa de mar", "platja gran tossa", "cala pola tossa"] }
  },
  'tossa-con-ninos': {
    es: { title: "Vacaciones en Familia: Tossa de Mar con Niños", desc: "Los mejores planes, playas seguras y actividades para tus vacaciones en familia en la Costa Brava.", cat: "Familia", keywords: ["tossa de mar con niños", "vacaciones en familia costa brava", "playas para niños costa brava", "planes en tossa en familia"] },
    ca: { title: "Vacances en Família: Tossa de Mar amb Nens", desc: "Els millors plans, platges segures i activitats per a les teves vacances en família a la Costa Brava.", cat: "Família", keywords: ["tossa de mar amb nens", "vacances en família costa brava", "platges per a nens costa brava", "plans a tossa en família"] },
    en: { title: "Family Holidays: Tossa de Mar with Kids", desc: "The best plans, safe beaches, and activities for your family holidays on the Costa Brava.", cat: "Family", keywords: ["tossa de mar with kids", "family holidays costa brava", "kid friendly beaches costa brava", "family plans tossa"] },
    fr: { title: "Vacances en Famille : Tossa de Mar avec des Enfants", desc: "Les meilleurs plans, plages sûres et activités pour vos vacances en famille sur la Costa Brava.", cat: "Famille", keywords: ["tossa de mar avec des enfants", "vacances en famille costa brava", "plages pour enfants costa brava", "plans en famille tossa"] }
  },
  'senderismo-tossa': {
    es: { title: "Ruta Camí de Ronda Tossa: Senderismo en la Costa Brava", desc: "Descubre la espectacular ruta del Camí de Ronda hacia Cala Pola y disfruta del mejor senderismo.", cat: "Naturaleza", keywords: ["ruta camí de ronda tossa", "senderismo costa brava", "rutas senderismo tossa de mar", "cala pola a pie"] },
    ca: { title: "Ruta Camí de Ronda Tossa: Senderisme a la Costa Brava", desc: "Descobreix l'espectacular ruta del Camí de Ronda cap a Cala Pola i gaudeix del millor senderisme.", cat: "Natura", keywords: ["ruta camí de ronda tossa", "senderisme costa brava", "rutes senderisme tossa de mar", "cala pola a peu"] },
    en: { title: "Camí de Ronda Tossa Route: Hiking on the Costa Brava", desc: "Discover the spectacular Camí de Ronda route towards Cala Pola and enjoy the best hiking.", cat: "Nature", keywords: ["camí de ronda tossa route", "hiking costa brava", "hiking trails tossa de mar", "cala pola on foot"] },
    fr: { title: "Itinéraire Camí de Ronda Tossa : Randonnée sur la Costa Brava", desc: "Découvrez le spectaculaire itinéraire du Camí de Ronda vers Cala Pola et profitez des meilleures randonnées.", cat: "Nature", keywords: ["itinéraire camí de ronda tossa", "randonnée costa brava", "sentiers de randonnée tossa de mar", "cala pola à pied"] }
  }
};

const ctas = {
  es: { title: "Reserva tu Estancia", btn: "Comprobar Disponibilidad", link: "/reservas" },
  ca: { title: "Reserva la teva Estada", btn: "Comprovar Disponibilitat", link: "/ca/reserves" },
  en: { title: "Book your Stay", btn: "Check Availability", link: "/en/booking" },
  fr: { title: "Réservez votre Séjour", btn: "Vérifier la Disponibilité", link: "/fr/reservations" }
};

const languagesList = ['es', 'ca', 'en', 'fr'];
const slugsList = Object.keys(config);

languagesList.forEach(lang => {
  const dir = path.join(blogDir, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  slugsList.forEach(slug => {
    const data = config[slug][lang];
    const cta = ctas[lang];
    let body = "";
    
    if (lang === 'ca') body = contentCa[slug];
    else if (lang === 'en') body = contentEn[slug];
    else if (lang === 'fr') body = contentFr[slug];
    else body = contentEs[slug];

    // Image translation logic
    const imgInfo = imageTranslations[slug][lang];
    const srcPath = path.join(imagesDir, imgInfo.src);
    const destPath = path.join(imagesDir, imgInfo.dest);

    // Copy original image to the translated filename if it doesn't exist
    if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied image: ${imgInfo.src} -> ${imgInfo.dest}`);
      } catch (err) {
        console.error(`Error copying image: ${err.message}`);
      }
    }

    const content = "---\n" +
      "title: \"" + data.title + "\"\n" +
      "description: \"" + data.desc + "\"\n" +
      "date: \"2026-05-16\"\n" +
      "author: \"El Bergantí & Hostalet\"\n" +
      "image: \"/images/" + imgInfo.dest + "\"\n" +
      "category: \"" + data.cat + "\"\n" +
      "tags: [\"Tossa de Mar\", \"" + data.cat + "\"]\n" +
      "keywords: [\"" + data.keywords.join('", "') + "\"]\n" +
      "readingTime: 6\n" +
      "---\n\n" +
      "import BlogCTA from '@src/components/BlogCTA.astro';\n\n" +
      body + "\n\n" +
      "<BlogCTA \n" +
      "  title=\"" + cta.title + "\" \n" +
      "  text=\"" + (cta.btn === 'Comprobar Disponibilidad' ? 'Reserva directamente con nosotros para obtener el mejor precio y trato familiar.' : (lang === 'en' ? 'Book directly with us to get the best price and friendly service.' : (lang === 'ca' ? 'Reserva directament amb nosaltres per obtenir el millor preu i tracte familiar.' : 'Réservez directement avec nous pour obtenir le meilleur prix et un service chaleureux.'))) + "\" \n" +
      "  buttonText=\"" + cta.btn + "\" \n" +
      "  link=\"" + cta.link + "\" \n" +
      "/>\n";

    fs.writeFileSync(path.join(dir, slug + '.mdx'), content);
  });
});

console.log('Regeneration complete with all languages translated and SEO images copied.');
