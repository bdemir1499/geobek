const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Modify the segment drawing logic to support dashed lines.
const oldSegmentDraw =         else if (stroke.type === 'segment') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();;

const newSegmentDraw =         else if (stroke.type === 'segment') {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            if (stroke.isDash) {
                ctx.setLineDash(stroke.dashPattern || [8, 8]);
            }
            ctx.stroke();
            ctx.restore();;

content = content.replace(oldSegmentDraw, newSegmentDraw);

// 2. Modify the izStroke creations to have a nicer color and thickness
content = content.replace(/color:\s*'rgba\(0, 0, 0, 0\.2\)',/g, "color: 'rgba(0, 150, 255, 0.6)',");
content = content.replace(/width:\s*1\.5,/g, "width: 2,");
content = content.replace(/dashPattern:\s*\[6, 6\],/g, "dashPattern: [8, 8],");

fs.writeFileSync(file, content, 'utf8');
console.log('Updated segment dashed rendering and fold trace styling.');
