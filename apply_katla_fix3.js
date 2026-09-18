const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/katla.js';
let content = fs.readFileSync(file, 'latin1');

const regex = /foldLine:\s*\[f1,\s*f2\]/g;
let prevContent = content;
content = content.replace(regex, "foldLine: [{x: f1.x * dpr, y: f1.y * dpr}, {x: f2.x * dpr, y: f2.y * dpr}]");

if (content !== prevContent) {
    fs.writeFileSync(file, content, 'latin1');
    console.log('katla.js foldLine dpr multiplication restored successfully!');
} else {
    console.log('Regex did not match!');
}
