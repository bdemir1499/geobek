const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/shape3d_fold.js';
const buf = fs.readFileSync(file);
console.log(buf.slice(0, 10));
