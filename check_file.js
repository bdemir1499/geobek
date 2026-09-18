const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/shape3d_fold.js';
if(fs.existsSync(file)) {
    console.log("File exists! Size:", fs.statSync(file).size);
} else {
    console.log("File does NOT exist!");
}
