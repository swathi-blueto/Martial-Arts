const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // Needed for parsing frontmatter

const contentDir = path.join(__dirname, '../content/events');
const outputFile = path.join(__dirname, '../public/content/events/index.json');

// Create output directory if it doesn't exist
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

// Read all Markdown files in content directory
const eventFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.md'));

const events = eventFiles.map(file => {
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Split frontmatter and content
  const frontmatterMatch = fileContent.match(/^---\n([\s\S]+?)\n---/);
  const frontmatter = frontmatterMatch ? yaml.load(frontmatterMatch[1]) : {};
  const body = fileContent.replace(/^---\n[\s\S]+?\n---/, '').trim();

  return {
    ...frontmatter,
    id: file.replace('.md', ''),
    slug: file.replace('.md', ''),
    body: body // Optional: include the Markdown content
  };
});

// Write combined JSON file
fs.writeFileSync(outputFile, JSON.stringify(events, null, 2));
console.log(`Generated ${events.length} events from Markdown files`);