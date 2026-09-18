const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

const regex = /if \(stroke\.points\) stroke\.points\.forEach\(p => \{ p\.x = mapX\(p\.x\); p\.y = mapY\(p\.y\); \}\);/g;

let prevContent = content;
content = content.replace(regex, "if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });\n          if (stroke.foldLine) stroke.foldLine.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });");

if (content !== prevContent) {
    fs.writeFileSync(file, content, 'latin1');
    console.log('app.js adaptStrokeToScreen patched for foldLine successfully!');
} else {
    console.log('Regex did not match!');
}
