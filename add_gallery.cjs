const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/initialData.js');
let text = fs.readFileSync(file, 'utf8');

const galleryDir = path.join(__dirname, 'public/assets/gallery');
const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.jpg'));

const galleryItems = files.map((f, i) => {
  return `    {
      id: "gal-${i+1}",
      title: "TEDx TAPMI Gallery",
      category: "All",
      image: "/assets/gallery/${f}",
      caption: "A beautiful moment from our event."
    }`;
}).join(',\n');

text = text.replace(/gallery:\s*\[[\s\S]*?\](,)?/, `gallery: [\n${galleryItems}\n  ]$1`);

fs.writeFileSync(file, text);
console.log(`Added ${files.length} images to gallery.`);
