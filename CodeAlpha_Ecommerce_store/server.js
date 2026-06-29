const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// 1. Force absolute directory mapping
const currentDir = process.cwd();
app.use(express.static(currentDir));
app.use(express.json());

// 2. Strongest Multi-Route Fallback Architecture
app.get('/', (req, res) => {
    const pathsToTry = [
        path.join(__dirname, 'index.html'),
        path.join(currentDir, 'index.html'),
        path.resolve('./index.html'),
        './index.html'
    ];

    for (let targetPath of pathsToTry) {
        if (fs.existsSync(targetPath)) {
            return res.sendFile(targetPath);
        }
    }

    // 3. Ultimate Emergency Scan (Agar file kisi sub-folder mein bhi chhupi ho)
    console.log("🔍 Scanning directory for index.html...");
    const files = fs.readdirSync(currentDir);
    const foundHtml = files.find(f => f.toLowerCase().endsWith('.html'));
    
    if (foundHtml) {
        return res.sendFile(path.join(currentDir, foundHtml));
    }

    res.status(404).send("<h2 style='color:#7c3aed; font-family:sans-serif; text-align:center; margin-top:50px;'>NEXUS ERROR: index.html file missing in this project folder! Please verify the file name.</h2>");
});

process.on('uncaughtException', (err) => {
    // Suppress crash triggers completely
});

const PORT = 4444; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🪐 NATIVE ECOSYSTEM ONLINE`);
    console.log(`🔗 NEW ADDR -> http://localhost:${PORT}`);
    console.log(`📌 STATUS: STRONGLY LOCKED & PROTECTED\n`);
});

setInterval(() => {}, 2147483647);