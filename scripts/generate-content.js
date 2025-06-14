
import fs from "fs";
import path from "path"


const contentDir = path.join(__dirname, '../content/events');
const outputFile = path.join(__dirname, '../public/content/events/index.json');

// Create output directory if it doesn't exist
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

// Read all JSON files in content directory
const eventFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.json'));

const events = eventFiles.map(file => {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
  return {
    ...JSON.parse(content),
    id: file.replace('.json', ''),
    slug: file.replace('.json', '')
  };
});

// Write combined JSON file
fs.writeFileSync(outputFile, JSON.stringify(events, null, 2));
console.log(`Generated ${events.length} events in ${outputFile}`);