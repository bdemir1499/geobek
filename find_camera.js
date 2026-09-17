const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('new THREE.PerspectiveCamera') || lines[i].includes('camera.position.set')) {
        console.log(`${i+1}: ${lines[i].trim()}`);
    }
}
