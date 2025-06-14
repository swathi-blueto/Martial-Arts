// import { promises as fs } from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import yaml from 'js-yaml';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const contentDir = path.join(__dirname, '../src/content/events');
// const outputDir = path.join(__dirname, '../public/content/events');
// const outputFile = path.join(outputDir, 'index.json');

// async function generateContent() {
//   try {
//     await fs.mkdir(outputDir, { recursive: true });

//     const files = await fs.readdir(contentDir);
//     const mdFiles = files.filter(file => file.endsWith('.md'));

//     const events = await Promise.all(
//       mdFiles.map(async (file) => {
//         const content = await fs.readFile(path.join(contentDir, file), 'utf8');

        
//         const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
//         if (!frontmatterMatch) throw new Error(`No frontmatter in ${file}`);

//         const metadata = yaml.load(frontmatterMatch[1]);

//         return {
//           ...metadata,
//           id: path.parse(file).name,
//           slug: path.parse(file).name,
//           image: metadata.image?.startsWith('/uploads/')
//             ? metadata.image
//             : `/uploads/${metadata.image}`
//         };
//       })
//     );

//     await fs.writeFile(outputFile, JSON.stringify(events, null, 2));
//     console.log(`✅ Generated ${events.length} events to index.json`);
//   } catch (error) {
//     console.error('❌ Content generation failed:', error);
//     process.exit(1);
//   }
// }

// generateContent();




import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// Constants
const CONTENT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/content/events');
const OUTPUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/content/events');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.json');

export async function generateContent() {
  try {
    // 1. Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // 2. Read and filter markdown files
    const files = await fs.readdir(CONTENT_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    if (mdFiles.length === 0) {
      console.warn('⚠️ No markdown files found in', CONTENT_DIR);
    }

    // 3. Process each file
    const events = await Promise.all(
      mdFiles.map(async (file) => {
        try {
          const filePath = path.join(CONTENT_DIR, file);
          const content = await fs.readFile(filePath, 'utf8');

          // Extract frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
          if (!frontmatterMatch) {
            throw new Error(`Invalid frontmatter in ${file}`);
          }

          const metadata = yaml.load(frontmatterMatch[1]);
          
          // Validate required fields
          if (!metadata.title || !metadata.date) {
            console.warn(`⚠️ Missing required fields in ${file}`);
          }

          return {
            ...metadata,
            id: path.parse(file).name,
            slug: path.parse(file).name,
            // Handle both external URLs and uploaded images
            image: metadata.image?.startsWith('http') 
              ? metadata.image 
              : metadata.image?.startsWith('/uploads/')
                ? metadata.image
                : `/uploads/${metadata.image}`
          };
        } catch (error) {
          console.error(`❌ Error processing ${file}:`, error);
          return null;
        }
      })
    );

    // 4. Filter out null entries and save
    const validEvents = events.filter(event => event !== null);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(validEvents, null, 2));
    console.log(`✅ Successfully processed ${validEvents.length}/${mdFiles.length} events`);

  } catch (error) {
    console.error('❌ Fatal error in content generation:', error);
    process.exit(1);
  }
}

