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
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    const files = await fs.readdir(GALLERY_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const galleryItems = await Promise.all(
      mdFiles.map(async (file) => {
        try {
          const content = await fs.readFile(path.join(GALLERY_DIR, file), 'utf8');
          const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
          if (!frontmatterMatch) throw new Error(`No frontmatter in ${file}`);

          const metadata = yaml.load(frontmatterMatch[1]);
          
         
          const requiredFields = ['title', 'category', 'image'];
          const missingFields = requiredFields.filter(field => !metadata[field]);
          if (missingFields.length > 0) {
            console.warn(`Missing fields in ${file}: ${missingFields.join(', ')}`);
            return null;
          }

          return {
            ...metadata,
            id: path.parse(file).name,
            slug: path.parse(file).name,
            image: metadata.image.startsWith('http') 
              ? metadata.image 
              : metadata.image.startsWith('/uploads/')
                ? metadata.image
                : `/uploads/${metadata.image}`,
            category: metadata.category.toLowerCase()
          };
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
          return null;
        }
      })
    );

    const validItems = galleryItems.filter(item => item !== null);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(validItems, null, 2));
    console.log(`✅ Generated ${validItems.length} gallery items`);
  } catch (error) {
    console.error('❌ Gallery generation failed:', error);
    throw error;
  }
}