const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

content = content.replace(/zIndex = '9995'/g, "zIndex = '15'");

fs.writeFileSync(file, content, 'latin1');
console.log('zIndex updated to 15!');
