const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'utf8');

// Use precise replace matching without relying on whitespace structure
const oldSegStart = "else if (stroke.type === 'segment') {";
const oldSegEnd = "ctx.stroke();";
const idxStart = content.indexOf(oldSegStart);
if (idxStart !== -1) {
    const idxEnd = content.indexOf(oldSegEnd, idxStart);
    if (idxEnd !== -1) {
        const fullSegStr = content.substring(idxStart, idxEnd + oldSegEnd.length);
        const newSegStr = fullSegStr
            .replace("ctx.beginPath();", "ctx.save();\n              ctx.beginPath();")
            .replace("ctx.stroke();", "if (stroke.isDash) {\n                  ctx.setLineDash(stroke.dashPattern || [5, 5]);\n              }\n              ctx.stroke();\n              ctx.restore();");
        content = content.replace(fullSegStr, newSegStr);
    }
}

// Replace the styling using Regex
content = content.replace(/color:\s*'rgba\(0,\s*0,\s*0,\s*0\.2\)',/g, "color: 'rgba(255, 105, 180, 0.7)',");
content = content.replace(/width:\s*1\.5,/g, "width: 2.5,");
content = content.replace(/dashPattern:\s*\[6,\s*6\],/g, "dashPattern: [10, 5],");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed styling via Node!');
