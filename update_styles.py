import re

file_path = 'C:/Users/bekir demirel/Desktop/geobek/app.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update segment rendering
old_seg = '''        else if (stroke.type === 'segment') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();'''

new_seg = '''        else if (stroke.type === 'segment') {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            if (stroke.isDash) {
                ctx.setLineDash(stroke.dashPattern || [5, 5]);
            }
            ctx.stroke();
            ctx.restore();'''

content = content.replace(old_seg, new_seg)

# 2. Update izStroke styles
content = re.sub(r"color:\s*'rgba\(0, 0, 0, 0\.2\)',", "color: 'rgba(255, 105, 180, 0.7)',", content)
content = re.sub(r"width:\s*1\.5,", "width: 2.5,", content)
content = re.sub(r"dashPattern:\s*\[6, 6\],", "dashPattern: [10, 5],", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
