import fs from 'fs';
import path from 'path';

const blogDir = 'src/content/blog';

// Regex to match emojis
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu;

function cleanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanDirectory(fullPath);
    } else if (fullPath.endsWith('.mdx') || fullPath.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (emojiRegex.test(content)) {
        content = content.replace(emojiRegex, '');
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Cleaned emojis from: ${fullPath}`);
      }
    }
  }
}

cleanDirectory(blogDir);
console.log('Emoji removal complete.');
