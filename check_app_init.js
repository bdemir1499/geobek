const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const lines = fs.readFileSync(file, 'latin1').split('\n');

let startIdx = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('init: function')) {
        startIdx = i;
        break;
    }
}

if(startIdx !== -1) {
    let endIdx = Math.min(lines.length, startIdx + 50);
    for(let i=startIdx; i<endIdx; i++) {
        console.log(`${i+1}: ${lines[i]}`);
    }
}
