const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
// Read as 'latin1' to preserve all byte values (no replacement characters)
let content = fs.readFileSync(file, 'latin1');

// 1. Fix izStroke creation (there are two of them, so we use regex to match the structure)
// We match up to the dashPattern part.
const izStrokeRegex = /const\s+izStroke\s*=\s*\{\s*type:\s*'line',\s*points:\s*\[p1,\s*p2\],\s*color:\s*'rgba\(0,\s*0,\s*0,\s*0\.2\)',[^w]+width:\s*1\.5,[^i]+isDash:\s*true,\s*dashPattern:\s*\[6,\s*6\],/g;

const izStrokeReplacement = `const izStroke = {
                  type: 'segment', 
                  p1: p1,
                  p2: p2,
                  color: 'rgba(255, 105, 180, 0.7)',
                  width: 2.5,
                  isDash: true, 
                  dashPattern: [10, 5],`;
                  
content = content.replace(izStrokeRegex, izStrokeReplacement);

// 2. Fix segment drawing logic
const oldSeg = `        else if (stroke.type === 'segment') {
              ctx.beginPath();
              ctx.moveTo(stroke.p1.x, stroke.p1.y);
              ctx.lineTo(stroke.p2.x, stroke.p2.y);
              ctx.strokeStyle = stroke.color;
              ctx.lineWidth = stroke.width || 4;
              ctx.lineCap = 'round';
              ctx.stroke();`;

const newSeg = `        else if (stroke.type === 'segment') {
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
              ctx.restore();`;

content = content.replace(oldSeg, newSeg);

fs.writeFileSync(file, content, 'latin1');
console.log('Successfully applied fixes without corrupting encoding!');
