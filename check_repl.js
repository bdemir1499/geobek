const fs = require('fs');
let content = fs.readFileSync('C:/Users/bekir demirel/Desktop/geobek/app.js');
let hasReplacementChar = content.includes(Buffer.from('\xef\xbf\xbd'));
console.log('Has replacement char:', hasReplacementChar);
