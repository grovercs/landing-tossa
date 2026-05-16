import fs from 'fs';
import path from 'path';

const backupDir = 'scratch/backups/blog_backup_2026_05_17';

if (!fs.existsSync('scratch/backups')) fs.mkdirSync('scratch/backups', { recursive: true });
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

// Backup blog posts
console.log('Backing up blog posts...');
copyFolderSync('src/content/blog', path.join(backupDir, 'blog'));

// Backup public images
console.log('Backing up public images...');
copyFolderSync('public/images', path.join(backupDir, 'images'));

console.log(`Backup completed successfully at ${backupDir}`);
