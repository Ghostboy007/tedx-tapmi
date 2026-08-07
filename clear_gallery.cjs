const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/initialData.js');
let text = fs.readFileSync(file, 'utf8');

// replace the gallery array with an empty array
const regex = /gallery:\s*\[[\s\S]*?\](,)?/;
text = text.replace(regex, 'gallery: []$1');

fs.writeFileSync(file, text);
console.log('Cleared gallery array.');
