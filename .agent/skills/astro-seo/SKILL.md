---
name: astro-seo
description: SEO and performance optimization best practices for Astro static sites, specifically tailored for hospitality and local business landing pages. Covers image optimization, schema markup, i18n SEO, GEO/AI search, Core Web Vitals, and external booking engine integration patterns.
when_to_use: "When working on an Astro project that needs SEO optimization, performance tuning, structured data, multi-language setup, or integration with booking engines like Cloudbeds."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Astro SEO — Best Practices for Hospitality Sites

> Comprehensive SEO, performance, and GEO guidelines for Astro static sites serving hotels, hostels, and local accommodations.

---

## 1. Image Optimization in Astro

### `public/` vs `src/assets/`

| Location | Behavior | Best For |
|----------|----------|----------|
| `public/images/` | Copied as-is, no optimization | Small sites, CMS-managed images |
| `src/assets/` | Processed by Astro: WebP/AVIF, srcset, lazy loading | Hero images, galleries, performance-critical |

### `<Image>` Component (requires `src/assets/`)

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/photo.jpg';
---
<Image src={myImage} alt="Descripción" width={800} height={600} />
```

### In-situ optimization for `public/` images

When migrating to `<Image>` is not feasible:

```html
<!-- Hero / Above the fold -->
<img src="/images/hero.webp" alt="..." fetchpriority="high" loading="eager" decoding="async" width="1920" height="1080" />

<!-- Below the fold / Gallery -->
<img src="/images/room.webp" alt="..." loading="lazy" decoding="async" />
```

### Critical attributes

| Attribute | When to use |
|-----------|-------------|
| `fetchpriority="high"` | Hero images, first viewport image |
| `loading="eager"` | Hero images (default is eager, but explicit is safer) |
| `loading="lazy"` | Everything below the fold |
| `decoding="async"` | All images to prevent main-thread blocking |
| `width` + `height` | All images to reserve space and reduce CLS |

---

## 2. Schema Markup for Accommodations

### Default: Organization (all pages)

Inject via `MainLayout` or a shared SEO component:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "El Bergantí & Hostalet de Tossa",
  "url": "https://landing-tossa.netlify.app",
  "logo": "https://landing-tossa.netlify.app/img/favicon.png",
  "sameAs": ["https://elberganti-tossa.com/", "https://www.hostalhostalet.com/"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tossa de Mar",
    "addressRegion": "Girona",
    "addressCountry": "ES"
  },
  "telephone": "+34 972 34 04 22"
}
```

### Room/Hotel pages: Hotel + AggregateRating

```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "El Bergantí",
  "image": "https://.../hotel.webp",
  "address": { "@type": "PostalAddress", "addressLocality": "Tossa de Mar", "addressCountry": "ES" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": 120
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi Gratis", "value": true }
  ]
}
```

### Blog posts: BlogPosting

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Guía Completa de Tossa de Mar",
  "image": ["https://.../cover.webp"],
  "datePublished": "2026-05-16",
  "author": [{ "@type": "Organization", "name": "El Bergantí & Hostalet", "url": "https://..." }],
  "description": "...",
  "keywords": "..."
}
```

---

## 3. i18n SEO

### Astro i18n configuration

```js
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en', 'fr'],
    routing: { prefixDefaultLocale: false }
  }
});
```

### Canonical + hreflang tags

Each page should include:

```html
<link rel="canonical" href="https://landing-tossa.netlify.app/es/rooms/el-berganti/" />
<link rel="alternate" hreflang="es" href="https://.../es/rooms/el-berganti/" />
<link rel="alternate" hreflang="ca" href="https://.../ca/rooms/el-berganti/" />
<link rel="alternate" hreflang="en" href="https://.../en/rooms/el-berganti/" />
<link rel="alternate" hreflang="fr" href="https://.../fr/rooms/el-berganti/" />
<link rel="alternate" hreflang="x-default" href="https://.../rooms/el-berganti/" />
```

### Sitemap multilingüe

`@astrojs/sitemap` generates `sitemap-index.xml` automatically. Ensure `site` is set in `astro.config.mjs`.

---

## 4. GEO / AI Search Optimization (2026)

### robots.txt for AI crawlers

```text
User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

Sitemap: https://landing-tossa.netlify.app/sitemap-index.xml
```

### llms.txt (optional, emerging standard)

Create `/public/llms.txt` with a structured summary of your business for AI consumption.

### Content structure for citability

- Use **134–167 word answer blocks** for key questions (GEO optimal length)
- Include **E-E-A-T signals**: first-hand local knowledge, specific details ("frente a la iglesia de Sant Vicenç")
- Add **author bios** with credentials
- Use **FAQ blocks** with `FAQPage` schema for voice search

---

## 5. Core Web Vitals in Astro

| Metric | Technique |
|--------|-----------|
| **LCP** | Preload hero image, eager loading, `<link rel="preload">` for critical fonts |
| **INP** | Minimize JS on main thread; Alpine.js is lightweight but defer non-critical |
| **CLS** | Always set `width` and `height` on images; reserve space for dynamic content |

### Prefetching

```html
<!-- Add to <head> -->
<link rel="dns-prefetch" href="//hotels.cloudbeds.com" />
<link rel="preconnect" href="https://hotels.cloudbeds.com" />
```

### Font optimization

```astro
<!-- In MainLayout.astro -->
<Font cssVariable="--font-roboto" preload />
```

---

## 6. External Booking Engine Integration

### Cloudbeds Group Booking (multi-property)

When Cloudbeds is configured with a Group Booking Engine:

1. Create a search form that redirects to the Cloudbeds URL with query parameters:
   ```
   https://groupname.cloudbeds.com?checkin=2026-06-01&checkout=2026-06-05&adults=2&children=0
   ```
2. Use `target="_blank"` to open in a new tab
3. Add a fallback message: "Serás redirigido a nuestro motor de reservas seguro gestionado por Cloudbeds."

### Until Group Booking is ready

Use a single-property Cloudbeds URL as fallback and explain to users that both properties can be booked from the same engine once configured.

### Security best practices

- Never embed Cloudbeds in an iframe without HTTPS
- Add `rel="noopener noreferrer"` to external booking links
- Ensure the Cloudbeds domain is in your CSP if you use one

---

## 7. Measurement & Verification

| Check | Tool |
|-------|------|
| Schema validity | Google Rich Results Test |
| Core Web Vitals | PageSpeed Insights |
| Mobile usability | Search Console |
| Indexing | Search Console + `site:` operator |
| robots.txt | `curl https://site/robots.txt` |
| Sitemap | `curl https://site/sitemap-index.xml` |

---

## Related Skills

| Skill | Use When |
|-------|----------|
| `seo-fundamentals` | General SEO principles, E-E-A-T, ranking factors |
| `frontend-design` | UI/UX patterns, color systems, typography |
| `performance-profiling` | Deep Web Vitals analysis, bundle optimization |
| `i18n-localization` | Advanced i18n patterns beyond Astro basics |
