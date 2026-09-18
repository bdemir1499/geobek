const fs = require('fs');
const file = 'C:/Users/bekir demirel/Desktop/geobek/app.js';
let content = fs.readFileSync(file, 'latin1');

const oldCode = `            if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                ctx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                ctx.translate(centerX, centerY);
                ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                ctx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);`;

const newCode = `            if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                const targetCtx = (stroke.isBackground !== false && typeof bgCtx !== 'undefined' && bgCtx) ? bgCtx : ctx;
                targetCtx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                targetCtx.translate(centerX, centerY);
                targetCtx.rotate((stroke.rotation || 0) * Math.PI / 180);

                targetCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);`;

// Now we also need to change ctx.restore() to targetCtx.restore() but only the first one!
// Let's replace the whole block dynamically

content = content.replace(/if \(imgToDraw && \(imgToDraw\.complete \|\| imgToDraw\.readyState >= 2\)\) \{[\s\S]*?ctx\.restore\(\);\s*\}/, function(match) {
    let modified = match.replace("ctx.save();", "const targetCtx = (stroke.isBackground !== false && typeof bgCtx !== 'undefined' && bgCtx) ? bgCtx : ctx;\n                targetCtx.save();");
    modified = modified.replace("ctx.translate(centerX, centerY);", "targetCtx.translate(centerX, centerY);");
    modified = modified.replace("ctx.rotate((stroke.rotation || 0) * Math.PI / 180);", "targetCtx.rotate((stroke.rotation || 0) * Math.PI / 180);");
    modified = modified.replace("ctx.drawImage(imgToDraw", "targetCtx.drawImage(imgToDraw");
    
    // We need to inject targetCtx.restore() before `if (typeof currentTool`
    modified = modified.replace("if (typeof currentTool !== 'undefined' && currentTool === 'move'", "targetCtx.restore();\n\n                if (typeof currentTool !== 'undefined' && currentTool === 'move'");
    
    // and we need to wrap the handles in ctx.save() and ctx.restore()
    // Wait, the handles already use ctx... but wait, the original block had `ctx.save()` at the top, and `ctx.restore()` at the bottom.
    // If we added targetCtx.restore() in the middle, and left `ctx.restore()` at the bottom, `ctx.restore()` would pop an unbalanced save if we didn't add a `ctx.save()` for the handles!
    modified = modified.replace("if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {", "if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {\n                    ctx.save();\n                    ctx.translate(centerX, centerY);\n                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);");
    
    return modified;
});

fs.writeFileSync(file, content, 'latin1');
console.log('Successfully updated redrawAllStrokes for bgCtx!');
