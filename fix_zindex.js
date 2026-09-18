const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

// Let's add zIndex in init
content = content.replace(/this\.container\.style\.display = 'block';\s*this\.container\.classList\.remove\('hidden'\);/g, "this.container.style.display = 'block';\n            this.container.style.zIndex = '9995';\n            this.container.classList.remove('hidden');");

fs.writeFileSync(file, content, 'latin1');
console.log('zIndex fixed for three-container!');
