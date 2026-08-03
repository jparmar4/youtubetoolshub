/**
 * Update blog.ts to reference .webp images instead of .png
 * Only updates references where a .webp counterpart exists
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogTsPath = path.join(__dirname, '..', 'src', 'config', 'blog.ts');
const imageDirPath = path.join(__dirname, '..', 'public', 'images', 'blog');

let content = fs.readFileSync(blogTsPath, 'utf8');
let updates = 0;

// Find all .png, .jpg, .jpeg references in blog.ts and check if .webp exists
const imgRegex = /\/images\/blog\/([^"]+)\.(png|jpe?g)/gi;
let match;
const replacements = [];

while ((match = imgRegex.exec(content)) !== null) {
  const basename = match[1];
  const ext = match[2];
  const webpPath = path.join(imageDirPath, `${basename}.webp`);
  
  if (fs.existsSync(webpPath)) {
    replacements.push({
      from: `/images/blog/${basename}.${ext}`,
      to: `/images/blog/${basename}.webp`,
    });
  }
}

// Apply replacements
for (const { from, to } of replacements) {
  const before = content;
  content = content.replaceAll(from, to);
  if (content !== before) {
    updates++;
    console.log(`  ✅ ${from} → ${to}`);
  }
}

if (updates > 0) {
  fs.writeFileSync(blogTsPath, content, 'utf8');
  console.log(`\n✅ Updated ${updates} image references in blog.ts (PNG → WebP)`);
} else {
  console.log('No updates needed.');
}
