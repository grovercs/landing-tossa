const fs = require('fs');
const path = require('path');

const languages = ['es', 'ca', 'en', 'fr'];
const slugs = ['guia-tossa-de-mar', 'que-comer-tossa', 'directorio-util-tossa', 'playas-calas-tossa'];

languages.forEach(lang => {
  const dir = path.join('src', 'content', 'blog', lang);
  console.log('Checking dir: ' + dir);
  if (!fs.existsSync(dir)) {
    console.log('Creating dir: ' + dir);
    fs.mkdirSync(dir, { recursive: true });
  }

  slugs.forEach(slug => {
    const filePath = path.join(dir, slug + '.mdx');
    const content = '---\ntitle: \"Post\"\ndate: \"2026-05-16\"\n---\n\nContent';
    fs.writeFileSync(filePath, content);
    console.log('Wrote file: ' + filePath);
  });
});
