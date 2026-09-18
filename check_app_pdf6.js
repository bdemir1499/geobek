const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const lines = fs.readFileSync(file, 'latin1').split('\n');

let startIdx = 1581;
let endIdx = Math.min(lines.length, startIdx + 30);
for(let i=startIdx; i<endIdx; i++) {
    console.log(`${i+1}: ${lines[i]}`);
}
