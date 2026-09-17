const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const startIndex = appJs.indexOf('if (isTwoHands) {');
const endIndex = appJs.indexOf('else {', startIndex);
if (startIndex >= 0 && endIndex > startIndex) {
    console.log(appJs.substring(startIndex, endIndex));
}
