import sys
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: true });", "canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: false });")
content = content.replace("const rect = canvasElm.getBoundingClientRect();", "const rect = canvasElm.getBoundingClientRect();\n\n    if (e.cancelable) e.preventDefault(); // Ekranin asagi kaymasini engeller")
content = content.replace("if (Math.hypot((s.x || window.innerWidth / 2) - nx, (s.y || window.innerHeight / 2) - ny) <= (s.width || 100) / 2 + eR)", "if (Math.hypot((s.x + (s.width || 100) / 2) - nx, (s.y + (s.height || 100) / 2) - ny) <= (s.width || 100) / 2 + eR)")
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fix applied successfully.')
