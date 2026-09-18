const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
const buf = fs.readFileSync(file);
console.log('0xE7 (ç) count:', buf.filter(b => b === 0xE7).length);
console.log('0x3F (?) count:', buf.filter(b => b === 0x3F).length);
