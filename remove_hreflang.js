const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

const targetDir = path.join(__dirname, 'src');

walkDir(targetDir, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Match languages: { ... } inside alternates block
        // This regex matches `languages: {` followed by anything until the closing `},`
        // We need to be careful not to match other things.
        
        let newContent = content;
        
        // 1. For site.ts
        if (filePath.endsWith('site.ts')) {
            newContent = newContent.replace(/languages:\s*\{\s*en:\s*"[^"]+",\s*"x-default":\s*"[^"]+",\s*\},/g, '');
        } 
        // 2. For layout.tsx
        else if (filePath.endsWith('layout.tsx')) {
            newContent = newContent.replace(/languages:\s*siteConfig\.seo\.alternates\.languages,/g, '');
        }
        // 3. For all other pages
        else {
            newContent = newContent.replace(/languages:\s*\{\s*"en":\s*[^,]+,\s*"x-default":\s*[^,]+,?\s*\},?/g, '');
            // Some might use single quotes or different formatting, let's use a more robust approach
            
            // Regex to match:
            // languages: {
            //     "en": "/...",
            //     "x-default": "/..."
            // },
            newContent = newContent.replace(/languages:\s*\{[\s\S]*?\},/g, function(match) {
                if (match.includes('"en":') || match.includes("'en':") || match.includes('en:') || match.includes('en-US')) {
                    if (match.includes('x-default')) {
                        return '';
                    }
                }
                return match;
            });
            
            // For sitemap.ts
            newContent = newContent.replace(/languages:\s*\{[\s\S]*?\}\s*\},?/g, function(match) {
                if (filePath.includes('sitemap')) {
                    if (match.includes('"en":') || match.includes('en:')) {
                         // Wait, sitemap might have alternates: { languages: { ... } }
                         return '';
                    }
                }
                return match;
            });
        }
        
        if (content !== newContent) {
            console.log("Modified:", filePath);
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
    }
});
