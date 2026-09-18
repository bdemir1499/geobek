const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'utf8');

// Replace points: [p1, p2] with p1: p1, p2: p2 for izStroke
// We'll just replace 'type: 'line', \n points: [p1, p2],' with 'type: 'segment', \n p1: p1, p2: p2,'
// using a regex.
content = content.replace(/type:\s*'line',\s*points:\s*\[p1,\s*p2\],/g, "type: 'segment',\n p1: p1,\n p2: p2,");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed izStroke.');
