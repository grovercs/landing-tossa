import fs from 'fs';
import path from 'path';

const blogDir = 'src/content/blog';
const result = {};

try {
  fs.readdirSync(blogDir).forEach(lang => {
    const langDir = path.join(blogDir, lang);
    if (fs.statSync(langDir).isDirectory()) {
      result[lang] = fs.readdirSync(langDir);
    }
  });
  fs.writeFileSync('scratch/blog_check.json', JSON.stringify(result, null, 2));
  console.log('Done');
} catch (e) {
  console.error(e);
}
