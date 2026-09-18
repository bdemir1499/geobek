const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

const regex = /drawLabel\(stroke\.label1,\s*stroke\.p1,\s*'#FF69B4'\);\s*drawLabel\(stroke\.label2,\s*stroke\.p2,\s*'#FF69B4'\);/g;

let prevContent = content;
content = content.replace(regex, "if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');\n              if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');");

if (content !== prevContent) {
    fs.writeFileSync(file, content, 'latin1');
    console.log('Successfully patched labels!');
} else {
    console.log('Regex did not match!');
}
