const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/initialData.js');
let text = fs.readFileSync(file, 'utf8');
const search = '/**\n * TEDxTapmi Initial Seed Data Models';
const lastIndex = text.lastIndexOf(search);
if (lastIndex > 0) {
  text = text.substring(lastIndex);
  fs.writeFileSync(file, text);
  console.log('Fixed file.');
} else {
  console.log('Not found.');
}
