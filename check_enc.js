const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const buf = fs.readFileSync(file);
const str = buf.toString('latin1');
const index = str.indexOf('?izgi');
if (index !== -1) {
    console.log('Found ?izgi. Byte is:', buf[index]);
} else {
    console.log('Not found');
}
const index2 = str.indexOf('çizgi');
if (index2 !== -1) {
    console.log('Found çizgi. Byte is:', buf[index2]);
}
