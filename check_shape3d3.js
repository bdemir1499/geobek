const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/shape3d_fold.js';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if(line.includes('init:') || line.includes('function init')) {
        console.log(`${i+1}: ${line}`);
    }
});
