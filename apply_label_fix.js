const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

const oldStr = `              drawLabel(stroke.label1, stroke.p1, '#FF69B4');
              drawLabel(stroke.label2, stroke.p2, '#FF69B4');
              if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');`;
              
const newStr = `              if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
              if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
              if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');`;

content = content.replace(oldStr, newStr);

fs.writeFileSync(file, content, 'latin1');
console.log('app.js labels patched successfully!');
