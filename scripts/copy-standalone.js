const fs = require('fs');
const path = require('path');

async function copyStandaloneAssets() {
  const rootDir = process.cwd();
  const standaloneDir = path.join(rootDir, '.next/standalone');
  
  console.log('Starting standalone asset copy process for Hostinger deployment...');

  try {
    // 1. Copy public directory
    const publicSrc = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');
    
    if (fs.existsSync(publicSrc)) {
      console.log(`Copying public directory from ${publicSrc} to ${publicDest}`);
      await fs.promises.cp(publicSrc, publicDest, { recursive: true });
    } else {
      console.log('No public directory found, skipping.');
    }

    // 2. Copy .next/static directory
    const staticSrc = path.join(rootDir, '.next/static');
    // Important: we need to place it inside .next/standalone/.next/static
    const staticDest = path.join(standaloneDir, '.next/static');
    
    if (fs.existsSync(staticSrc)) {
      console.log(`Copying static directory from ${staticSrc} to ${staticDest}`);
      await fs.promises.cp(staticSrc, staticDest, { recursive: true });
    } else {
      console.log('No .next/static directory found, skipping.');
    }

    console.log('Successfully copied all assets to standalone directory!');
  } catch (err) {
    console.error('Error during standalone asset copy process:', err);
    process.exit(1);
  }
}

copyStandaloneAssets();
