import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GALLERY_DIR = path.join(__dirname, '../src/content/gallery');
const OUTPUT_DIR = path.join(__dirname, '../public/content/gallery');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.json');

export async function generateGallery() {
  try {
    // Check if the directory exists
    await fs.access(GALLERY_DIR);

    const files = await fs.readdir(GALLERY_DIR);
    const items = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(GALLERY_DIR, file);
        return {
          name: path.parse(file).name,
          file: `/uploads/gallery/${file}` // adjust as per your logic
        };
      })
    );

    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(items, null, 2));
    console.log(`✅ Gallery generated with ${items.length} items`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`⚠️ Gallery directory not found: ${GALLERY_DIR} — skipping gallery generation`);
    } else {
      throw err;
    }
  }
}
