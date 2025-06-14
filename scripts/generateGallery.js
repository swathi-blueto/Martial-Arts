import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GALLERY_DIR = path.join(__dirname, '../src/content/gallery');
const OUTPUT_DIR = path.join(__dirname, '../public/content/gallery');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.json');

export async function generateGallery() {
  try {
    // 1. Ensure directories exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // 2. Read and filter markdown files
    const files = await fs.readdir(GALLERY_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    if (mdFiles.length === 0) {
      console.warn('⚠️ No markdown files found in gallery directory');
      return;
    }

    // 3. Process each markdown file
    const galleryItems = await Promise.all(
      mdFiles.map(async (file) => {
        try {
          const filePath = path.join(GALLERY_DIR, file);
          const content = await fs.readFile(filePath, 'utf8');

          // Extract frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
          if (!frontmatterMatch) {
            throw new Error(`Invalid frontmatter in ${file}`);
          }

          const metadata = yaml.load(frontmatterMatch[1]);

          // Validate required fields
          if (!metadata.title || !metadata.category || !metadata.image) {
            console.warn(`⚠️ Missing required fields in ${file}`);
            return null;
          }

          // Process image path
          const imagePath = metadata.image.startsWith('http') 
            ? metadata.image 
            : metadata.image.startsWith('/uploads/')
              ? metadata.image
              : `/uploads/${metadata.image}`;

          return {
            ...metadata,
            id: path.parse(file).name,
            slug: path.parse(file).name,
            image: imagePath,
            // Ensure category is lowercase for consistency
            category: metadata.category.toLowerCase()
          };
        } catch (error) {
          console.error(`❌ Error processing ${file}:`, error);
          return null;
        }
      })
    );

    // 4. Filter out null entries and save
    const validItems = galleryItems.filter(item => item !== null);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(validItems, null, 2));
    console.log(`✅ Generated gallery with ${validItems.length} items`);

  } catch (error) {
    console.error('❌ Gallery generation failed:', error);
    process.exit(1);
  }
}