const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

const oldLines = `                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);
                }
                ctx.restore();`;

const newLines = `                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);
                    
                    ctx.restore();
                }`;

// Convert back to string replacement but safely.
const lines = content.split('\n');
const tLines = oldLines.split('\n');
const rLines = newLines.split('\n');

let startIndex = -1;
for (let i = 0; i <= lines.length - tLines.length; i++) {
    let match = true;
    for (let j = 0; j < tLines.length; j++) {
        if (lines[i + j] !== tLines[j]) {
            match = false;
            break;
        }
    }
    if (match) {
        startIndex = i;
        break;
    }
}

if (startIndex !== -1) {
    lines.splice(startIndex, tLines.length, ...rLines);
    fs.writeFileSync(file, lines.join('\n'), 'latin1');
    console.log('Successfully fixed unbalanced ctx.restore()!');
} else {
    console.log('Target string not found line-by-line! Attempting regex...');
    // regex fallback just in case
    let regexStr = oldLines.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s*');
    if(new RegExp(regexStr).test(content)) {
        content = content.replace(new RegExp(regexStr), newLines);
        fs.writeFileSync(file, content, 'latin1');
        console.log('Fixed using regex!');
    } else {
        console.log('Could not fix!');
    }
}
