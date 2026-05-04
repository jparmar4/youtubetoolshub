const fs = require('fs');
const path = require('path');

async function copyStandaloneAssets() {
  const rootDir = process.cwd();
  const standaloneDir = path.join(rootDir, '.next/standalone');

  console.log('Starting standalone asset copy process for Hostinger deployment...');
  console.log(`Root dir: ${rootDir}`);
  console.log(`Standalone dir: ${standaloneDir}`);

  if (!fs.existsSync(standaloneDir)) {
    console.error('ERROR: .next/standalone directory not found!');
    console.error('Make sure next.config.mjs has output: "standalone"');
    process.exit(1);
  }

  try {
    // 1. Copy public directory
    const publicSrc = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');

    if (fs.existsSync(publicSrc)) {
      console.log(`Copying public/ → .next/standalone/public/`);
      await fs.promises.cp(publicSrc, publicDest, { recursive: true, force: true });
      console.log('✓ public/ copied successfully');
    } else {
      console.log('No public directory found, skipping.');
    }

    // 2. Copy .next/static directory
    //    CRITICAL: Must go to .next/standalone/.next/static (not .next/standalone/static)
    //    The Next.js standalone server serves /_next/static/ from this location.
    const staticSrc = path.join(rootDir, '.next/static');
    const staticDest = path.join(standaloneDir, '.next/static');

    if (fs.existsSync(staticSrc)) {
      console.log(`Copying .next/static/ → .next/standalone/.next/static/`);
      // Ensure dest .next dir exists
      await fs.promises.mkdir(path.join(standaloneDir, '.next'), { recursive: true });
      await fs.promises.cp(staticSrc, staticDest, { recursive: true, force: true });
      
      // Verify the copy
      const cssFiles = findFiles(staticDest, '.css');
      const jsFiles = findFiles(staticDest, '.js').length;
      console.log(`✓ .next/static/ copied: ${jsFiles} JS files, ${cssFiles.length} CSS files`);
    } else {
      console.error('ERROR: .next/static directory not found! CSS will not load.');
      process.exit(1);
    }

    console.log('\n✅ All assets copied to standalone directory successfully!');
    console.log('The site should now serve CSS and JS correctly on Hostinger.\n');
  } catch (err) {
    console.error('Error during standalone asset copy process:', err);
    process.exit(1);
  }
}

/** Recursively find files with a given extension */
function findFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

copyStandaloneAssets();
