const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'public', 'assets');
const initialDataPath = path.join(__dirname, 'src', 'data', 'initialData.js');

let newGalleryArray = [];
let idCounter = 1;

if (fs.existsSync(galleryDir)) {
    const categories = ['Audience', 'Keynotes', 'Networking', 'Stage', 'Team'];
    categories.forEach(category => {
        const categoryPath = path.join(galleryDir, category);
        if (fs.existsSync(categoryPath) && fs.statSync(categoryPath).isDirectory()) {
            const files = fs.readdirSync(categoryPath);
            files.forEach(file => {
                if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    newGalleryArray.push({
                        id: `gal-${idCounter++}`,
                        title: `TEDx TAPMI ${category}`,
                        category: category,
                        image: `/assets/${category}/${file}`,
                        caption: `A beautiful moment from our ${category} session.`
                    });
                }
            });
        }
    });
}

// Convert the array to a formatted string
let newGalleryStr = 'gallery: [\n' + newGalleryArray.map(item => `    {
      id: "${item.id}",
      title: "${item.title}",
      category: "${item.category}",
      image: "${item.image}",
      caption: "${item.caption}"
    }`).join(',\n') + '\n  ],';

// Read the existing file
let fileContent = fs.readFileSync(initialDataPath, 'utf8');

// Replace the existing gallery array
const regex = /gallery:\s*\[[\s\S]*?\n  \],/;
fileContent = fileContent.replace(regex, newGalleryStr);

fs.writeFileSync(initialDataPath, fileContent, 'utf8');
console.log('Successfully updated gallery with ' + newGalleryArray.length + ' images directly from /assets/{Category}.');
