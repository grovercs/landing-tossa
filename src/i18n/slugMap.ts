/**
 * Blog slug mapping across languages.
 * Each group represents the same post in different languages.
 * The LanguagePicker uses this to generate correct URLs when switching languages
 * from within a blog post that has different slugs per locale.
 */
export type SlugGroup = Record<string, string>;

export const blogSlugGroups: SlugGroup[] = [
  {
    es: 'donde-dormir-tossa-centro',
    ca: 'on-dormir-tossa-centre',
    en: 'where-to-stay-tossa-old-town',
    fr: 'ou-dormir-tossa-centre',
  },
  {
    es: 'hotel-desayuno-incluido-costa-brava',
    ca: 'hotel-esmorzar-inclos-costa-brava',
    en: 'hotel-breakfast-included-costa-brava',
    fr: 'hotel-petit-dejeuner-inclus-costa-brava',
  },
  {
    es: 'escapada-romantica-tossa-de-mar',
    ca: 'escapada-romantica-tossa-de-mar',
    en: 'romantic-getaway-tossa-de-mar',
    fr: 'escapade-romantique-tossa-de-mar',
  },
];

// Build a lookup map for O(1) access keyed by any slug in any language.
export const blogSlugMap = new Map<string, SlugGroup>();

for (const group of blogSlugGroups) {
  for (const slug of Object.values(group)) {
    blogSlugMap.set(slug, group);
  }
}

/**
 * Get the localized slug for a given blog post slug and target language.
 * Falls back to the same slug if no mapping exists.
 */
export function getLocalizedBlogSlug(currentSlug: string, targetLang: string): string {
  const group = blogSlugMap.get(currentSlug);
  if (group && group[targetLang]) {
    return group[targetLang];
  }
  return currentSlug;
}
