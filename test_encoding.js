const fs = require('fs');
const iconv = require('iconv-lite');

const buf = fs.readFileSync('app.js');
const str = iconv.decode(buf, 'win1254');
const lines = str.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('BA')) {
        console.log(`Line ${i+1}: ${lines[i]}`);
    }
}
