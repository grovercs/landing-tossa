const fs = require('fs');
const path = require('path');

const languages = ['es', 'ca', 'en', 'fr'];
const blogPath = path.join('src', 'content', 'blog');

languages.forEach(lang => {
  const dir = path.join(blogPath, lang);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (!file.endsWith('.mdx')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Simple regex to replace single quotes with double quotes in title/description frontmatter
    // and fix the escaped quotes
    content = content.replace(/^title: '(.*)'$/m, (match, p1) => {
      return 'title: \"' + p1.replace(/\\'/g, "'").replace(/"/g, '\\"') + '\"';
    });
    content = content.replace(/^description: '(.*)'$/m, (match, p1) => {
      return 'description: \"' + p1.replace(/\\'/g, "'").replace(/"/g, '\\"') + '\"';
    });

    fs.writeFileSync(filePath, content);
  });
});

console.log('Fixed quotes in all frontmatter');
