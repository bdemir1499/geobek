const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `    // Public GitHub bağlantısı için standart Google STUN sunucuları (mDNS engelini aşmak için)
    const publicIce = {
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        }`;

const replaceStr = `    // STUN sunucularını kaldırıyoruz. Bu sayede cihazlar IP adreslerini dışarıdan
    // öğrenemez ve SADECE aynı yerel ağda (Wi-Fi) bağlanabilir.
    const publicIce = {
        config: {
            iceServers: []`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully updated createPeer to enforce same WiFi!');
} else {
    console.log('Target string not found!');
}
