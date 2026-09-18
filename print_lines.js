const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const lines = fs.readFileSync(file, 'latin1').split('\n');

for(let i=1604; i<=1634; i++) {
    console.log(`${i+1}: ${lines[i]}`);
}
