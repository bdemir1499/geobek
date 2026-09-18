const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'utf8');

// Restore the Google STUN server for publicIce so mDNS IP leak protection doesn't block local connections
content = content.replace(
    "const publicIce = { config: { iceServers: [] } };", 
    "const publicIce = { config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } };"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Restored STUN server');
