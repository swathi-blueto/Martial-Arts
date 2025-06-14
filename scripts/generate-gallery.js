import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// Constants for gallery
const CONTENT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/content/gallery');
const OUTPUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/content/gallery');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.json');
async function generateGallery() {
  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Read markdown files
    const files = await fs.readdir(CONTENT_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    if (mdFiles.length === 0) {
      console.warn('⚠️ No markdown files found in', CONTENT_DIR);
    }

    // Process each markdown file
    const items = await Promise.all(
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

          if (!metadata.title || !metadata.image) {
            console.warn(`⚠️ Missing required fields in ${file}`);
          }

          return {
            ...metadata,
            id: path.parse(file).name,
            slug: path.parse(file).name,
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

    const validItems = items.filter(item => item !== null);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(validItems, null, 2));
    console.log(`✅ Successfully processed ${validItems.length}/${mdFiles.length} gallery items`);

  } catch (error) {
    console.error('❌ Fatal error in gallery generation:', error);
    process.exit(1);
  }
}

generateGallery();