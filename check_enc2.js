const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const buf = fs.readFileSync(file);
const str = buf.toString('latin1');
const index = str.indexOf('izgi');
if (index !== -1) {
    console.log('Found izgi. Preceding byte is:', buf[index-1]);
} else {
    console.log('Not found izgi');
}
