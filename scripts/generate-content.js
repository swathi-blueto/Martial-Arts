import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// ES Module equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contentDir = path.join(__dirname, '../content/events');
const outputDir = path.join(__dirname, '../public/content/events');
const outputFile = path.join(outputDir, 'index.json');

async function generateContent() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Read all Markdown files
    const files = await fs.readdir(contentDir);
    const eventFiles = files.filter(file => file.endsWith('.md'));

    // Process each file
    const events = await Promise.all(
      eventFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
        const frontmatter = frontmatterMatch ? yaml.load(frontmatterMatch[1]) : {};
        
        return {
          ...frontmatter,
          id: path.parse(file).name,
          slug: path.parse(file).name
        };
      })
    );

    // Write combined output
    await fs.writeFile(outputFile, JSON.stringify(events, null, 2));
    console.log(`Generated ${events.length} events in ${outputFile}`);
  } catch (error) {
    console.error('Error generating content:', error);
    process.exit(1);
  }
}

generateContent();