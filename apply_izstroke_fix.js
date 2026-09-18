const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

// Match the izStroke block
const regex = /const izStroke = \{\s*type: 'line',\s*points: \[p1, p2\],\s*color: 'rgba\(0, 0, 0, 0\.2\)',.*?\s*width: 1\.5,.*?\s*isDash: true,\s*dashPattern: \[6, 6\],/g;

let prevContent = content;
content = content.replace(regex, `const izStroke = {
                    type: 'segment',
                    p1: p1,
                    p2: p2,
                    color: 'rgba(255, 105, 180, 0.7)',
                    width: 2.5,
                    isDash: true,
                    dashPattern: [10, 5],`);

if (content !== prevContent) {
    fs.writeFileSync(file, content, 'latin1');
    console.log('app.js izStroke patched successfully!');
} else {
    console.log('Regex did not match!');
}
