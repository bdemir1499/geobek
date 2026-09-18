const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1'); // Use latin1 due to turkish characters

const regex = /const publicIce = \{\s*config:\s*\{\s*iceServers:\s*\[[\s\S]*?\]\s*\}\s*\};/;

const replaceStr = `// STUN sunucularını kaldırıyoruz. Bu sayede cihazlar IP adreslerini dışarıdan
    // öğrenemez ve SADECE aynı yerel ağda (Wi-Fi) bağlanabilir.
    const publicIce = {
        config: {
            iceServers: []
        }
    };`;

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(file, content, 'latin1');
    console.log('Successfully updated createPeer to enforce same WiFi!');
} else {
    console.log('Target regex not found!');
}
