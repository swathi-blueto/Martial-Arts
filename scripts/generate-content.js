import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { generateContent } from "./generateEvents.js";
import { generateGallery } from "./generateGallery.js";

async function main() {
  try {
    await generateContent();
    await generateGallery();
  } catch (error) {
    console.error("❌ Content generation failed:", error);
    process.exit(1);
  }
}

main();
