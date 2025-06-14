import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import your generators
import { generateContent } from './generateEvents.js';
import { generateGallery } from './generateGallery.js';

async function main() {
  try {
    console.log('🏗️ Starting content generation...');
    
    // Run both generators sequentially (better for error handling)
    await generateContent();
    await generateGallery();
    
    console.log('✅ All content generated successfully');
  } catch (error) {
    console.error('❌ Content generation failed:', error);
    process.exit(1);
  }
}

main();