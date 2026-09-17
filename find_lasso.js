const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('lasso') || lines[i].toLowerCase().includes('snapshot')) {
        console.log(`${i+1}: ${lines[i].trim()}`);
    }
}
