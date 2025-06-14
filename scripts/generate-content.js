import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content/events');
const outputDir = path.join(__dirname, '../public/content/events');
const outputFile = path.join(outputDir, 'index.json');

async function generateContent() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    
    const files = await fs.readdir(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const events = await Promise.all(
      markdownFiles.map(async (file) => {
        const content = await fs.readFile(path.join(contentDir, file), 'utf8');
        const frontmatter = content.match(/^---\n([\s\S]+?)\n---/);
        const metadata = frontmatter ? yaml.load(frontmatter[1]) : {};
        
        return {
          ...metadata,
          id: path.parse(file).name,
          slug: path.parse(file).name,
          // Fix image paths
          image: metadata.image?.startsWith('/uploads/') 
            ? metadata.image 
            : `/uploads/${metadata.image}`
        };
      })
    );

    await fs.writeFile(outputFile, JSON.stringify(events, null, 2));
    console.log(`Successfully processed ${events.length} events`);
  } catch (error) {
    console.error('Content generation failed:', error);
    process.exit(1);
  }
}

generateContent();