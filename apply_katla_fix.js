const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/katla.js';
let content = fs.readFileSync(file, 'latin1');

const regex = /const\s+patchObj\s*=\s*\{[^}]*foldLine:\s*\[\{x:\s*p1\.x\s*\*\s*dpr,\s*y:\s*p1\.y\s*\*\s*dpr\},\s*\{x:\s*p2\.x\s*\*\s*dpr,\s*y:\s*p2\.y\s*\*\s*dpr\}\],[^}]*\};/g;

const replacement = `      let f1 = {x: p1.x, y: p1.y};
      let f2 = {x: p2.x, y: p2.y};
      if (currentCaptureRect && p1 && p2) {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const nx = -dy; const ny = dx;
              const left = currentCaptureRect.x; const right = currentCaptureRect.x + currentCaptureRect.w;
              const top = currentCaptureRect.y; const bottom = currentCaptureRect.y + currentCaptureRect.h;
              let pts = [];
              if (nx !== 0) {
                  let t = (left - midX) / nx; let y = midY + ny * t; if (y >= top && y <= bottom) pts.push({x: left, y: y});
                  t = (right - midX) / nx; y = midY + ny * t; if (y >= top && y <= bottom) pts.push({x: right, y: y});
              }
              if (ny !== 0) {
                  let t = (top - midY) / ny; let x = midX + nx * t; if (x >= left && x <= right) pts.push({x: x, y: top});
                  t = (bottom - midY) / ny; x = midX + nx * t; if (x >= left && x <= right) pts.push({x: x, y: bottom});
              }
              let uPts = [];
              for (let p of pts) {
                  if (!uPts.some(up => Math.abs(up.x - p.x) < 0.1 && Math.abs(up.y - p.y) < 0.1)) uPts.push(p);
              }
              if (uPts.length === 2) { f1 = uPts[0]; f2 = uPts[1]; }
          }
      }
      
      const patchObj = { 
          type: 'image', imgData: dataUrl, 
          x: cropX * dpr, 
          y: cropY * dpr, 
          width: cropW * dpr, 
          height: cropH * dpr, 
          rotation: 0, 
          isBackground: false, 
          isPatch: true,
          foldLine: [f1, f2],
          id: Date.now() + Math.random().toString() 
      };`;

let prevContent = content;
content = content.replace(regex, replacement);

if (content !== prevContent) {
    fs.writeFileSync(file, content, 'latin1');
    console.log('katla.js patched successfully!');
} else {
    console.log('Regex did not match!');
}
