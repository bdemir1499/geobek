const { JSDOM } = require('jsdom');
const fs = require('fs');
const appJs = fs.readFileSync('C:/Users/bekir demirel/Desktop/geobek/app.js', 'utf8');

const dom = new JSDOM(<!DOCTYPE html><html><body><canvas id="main-canvas" width="800" height="600"></canvas><canvas id="bg-canvas" width="800" height="600"></canvas></body></html>, {
    runScripts: 'dangerously',
    beforeParse(window) {
        window.isTablet = false;
        window.navigator.mediaDevices = { getUserMedia: () => Promise.resolve() };
        // Mock PeerJS
        window.Peer = class Peer {
            constructor() { this.id = 'test'; }
            on() {}
        };
        // Catch errors
        window.onerror = function(msg, url, line) {
            console.error("ERROR CAUGHT:", msg, "Line:", line);
        };
    }
});
const script = dom.window.document.createElement('script');
script.textContent = appJs;
dom.window.document.head.appendChild(script);

// Wait a bit, then simulate receiving a segment stroke
setTimeout(() => {
    console.log("Adding segment stroke...");
    dom.window.drawnStrokes.push({
        type: 'segment',
        p1: {x: 10, y: 10},
        p2: {x: 100, y: 100},
        color: '#ff0000',
        width: 2,
        isDash: true,
        dashPattern: [5, 5]
    });
    try {
        dom.window.redrawAllStrokes();
        console.log("redrawAllStrokes executed successfully!");
    } catch(e) {
        console.error("Error in redrawAllStrokes:", e);
    }
}, 500);
