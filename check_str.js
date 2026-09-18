const fs = require('fs');
let content = fs.readFileSync('C:/Users/bekir demirel/Desktop/geobek/app.js', 'utf8');
console.log('Contains aciolcer:', content.includes('açıölçer'));
