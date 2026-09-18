const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

// 1. Add save/restore and isDash for segment
const segRegex = /else if \(stroke\.type === 'segment'\) \{\s*ctx\.beginPath\(\);\s*ctx\.moveTo\(stroke\.p1\.x, stroke\.p1\.y\);\s*ctx\.lineTo\(stroke\.p2\.x, stroke\.p2\.y\);\s*ctx\.strokeStyle = stroke\.color;\s*ctx\.lineWidth = stroke\.width \|\| 4;\s*ctx\.lineCap = 'round';\s*ctx\.stroke\(\);/g;

content = content.replace(segRegex, `else if (stroke.type === 'segment') {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            if (stroke.isDash) {
                ctx.setLineDash(stroke.dashPattern || [5, 5]);
            }
            ctx.stroke();
            ctx.restore();`);

// 2. Fix drawLabel for undefined labels
content = content.replace(/drawLabel\(stroke\.label1, stroke\.p1, '#FF69B4'\);/g, "if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');");
content = content.replace(/drawLabel\(stroke\.label2, stroke\.p2, '#FF69B4'\);/g, "if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');");

fs.writeFileSync(file, content, 'latin1');
console.log('app.js segment and label fixes applied successfully!');
