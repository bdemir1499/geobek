const fs = require('fs');
const lines = fs.readFileSync('C:/Users/bekir demirel/Desktop/geobek/app.js', 'utf8').split('\n');
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('function createPeer')) {
        for(let j=i; j<i+20; j++) {
            console.log(j + ": " + lines[j]);
        }
        break;
    }
}
