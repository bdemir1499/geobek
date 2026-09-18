const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/shape3d_fold.js';
const lines = fs.readFileSync(file, 'utf8').split('\n');
lines.forEach((line, i) => {
    if(line.includes('init(') || line.includes('isTablet')) {
        console.log(`${i+1}: ${line}`);
    }
});
