# Prompts para Imágenes de Blog — Nuevos Posts

## Formato recomendado
- **Herramientas:** Midjourney v7, DALL-E 3, Leonardo AI o Adobe Firefly.
- **Ratio:** 3:2 horizontal (1200 × 800 px aprox).
- **Estilo:** Fotografía realista, luz natural dorada (golden hour), estética editorial de viajes.
- **Sin texto ni logotipos** en la imagen generada.

---

## Prompts únicos (3 imágenes)

Cada prompt se usa **una sola vez**. La misma imagen generada se renombra para cada idioma.

### Prompt 1 — Habitación en el centro
> Cozy double bedroom in a Mediterranean boutique hostel, stone walls, white linen bedding, soft natural light through wooden shutters, terracotta floor, small balcony with geraniums, view of a narrow cobblestone street in Tossa de Mar old town, golden hour warm light, travel magazine photography, 3:2 horizontal, photorealistic, no text.

### Prompt 2 — Desayuno incluido
> Rustic Mediterranean breakfast spread on a wooden table, pa amb tomàquet, Serrano ham slices, fresh figs and peaches, artisan cheese, coffee in a ceramic cup, olive oil bottle, sunny terrace with sea view in Tossa de Mar, morning golden light, food photography, shallow depth of field, travel editorial style, 3:2 horizontal, photorealistic, no text.

### Prompt 3 — Escapada romántica
> Young couple holding hands walking through medieval stone archway at sunset in Tossa de Mar Vila Vella, warm golden backlight, Mediterranean sea visible in background, romantic atmosphere, cobblestone street, bougainvillea flowers on walls, travel magazine cover photo, soft bokeh, 3:2 horizontal, photorealistic, no text.

---

## Nombres de archivo por idioma (12 archivos)

Renombra las 3 imágenes generadas con los nombres siguientes para cada idioma:

| # | Prompt | Español | Català | English | Français |
|---|--------|---------|--------|---------|----------|
| 1 | Habitación | `donde-dormir-tossa-centro-habitacion.png` | `on-dormir-tossa-centre-habitacio.png` | `where-stay-tossa-old-town-room.png` | `ou-dormir-tossa-centre-chambre.png` |
| 2 | Desayuno | `hotel-desayuno-incluido-costa-brava.png` | `hotel-esmorzar-inclos-costa-brava.png` | `hotel-breakfast-included-costa-brava.png` | `hotel-petit-dejeuner-inclus-costa-brava.png` |
| 3 | Romántica | `escapada-romantica-tossa-de-mar.png` | `escapada-romantica-tossa-de-mar-ca.png` | `romantic-getaway-tossa-de-mar.png` | `escapade-romantique-tossa-de-mar.png` |

---

## Instrucciones para subir las imágenes

1. Genera las **3 imágenes** con tu herramienta preferida (Midjourney recomendado para calidad fotorealista).
2. Convierte a formato **WebP** o **PNG**.
3. Optimiza tamaño: máximo **200 KB** por imagen usando TinyPNG o Squoosh.
4. Crea **12 archivos** en `public/images/` duplicando y renombrando cada imagen según la tabla de arriba.
5. Verifica que la build incluya las imágenes: `npm run build` y revisa `dist/images/`.

### Consejo
Si quieres ahorrar espacio, puedes subir solo los 3 archivos únicos y renombrarlos antes de build. Pero para SEO local es mejor tener los 12 nombres distintos en producción.
