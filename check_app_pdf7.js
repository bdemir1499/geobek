const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const lines = fs.readFileSync(file, 'latin1').split('\n');

let startIdx = 1611;
let endIdx = Math.min(lines.length, startIdx + 80);
for(let i=startIdx; i<endIdx; i++) {
    console.log(`${i+1}: ${lines[i]}`);
}
