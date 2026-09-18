const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

content = content.replace(/if \(this\.container\) \{ this\.container\.style\.display = 'block'; this\.container\.classList\.remove\('hidden'\); \}/g, "if (this.container) { this.container.style.display = 'block'; this.container.style.zIndex = '9995'; this.container.classList.remove('hidden'); }");

fs.writeFileSync(file, content, 'latin1');
console.log('zIndex fixed for onDown!');
