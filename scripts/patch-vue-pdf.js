/**
 * vue-pdf@4.3.0 pdfjsWrapper.js patch
 * Fixes: "undefined is not an object (evaluating 'l.cancel().catch')"
 * pdfRender.cancel() may return undefined on some browsers (iOS Safari).
 * This patch wraps cancel in try-catch and checks return value before calling .catch()
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'node_modules', 'vue-pdf', 'src', 'pdfjsWrapper.js');

if (!fs.existsSync(filePath)) {
    console.log('[patch-vue-pdf] File not found, skipping patch.');
    process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf8');

const original = 'pdfRender.cancel().catch(function(err) {\r\n\t\t\t\t\t\temitEvent(\'error\', err);\r\n\t\t\t\t\t});';
const patched = 'try { var cr = pdfRender.cancel(); if (cr && typeof cr.catch === "function") cr.catch(function() {}); } catch(e) {}';

if (content.includes(patched)) {
    console.log('[patch-vue-pdf] Already patched.');
    process.exit(0);
}

if (content.includes('pdfRender.cancel().catch(function(err)')) {
    content = content.replace(
        /pdfRender\.cancel\(\)\.catch\(function\(err\)\s*\{[\s\S]*?emitEvent\('error',\s*err\);[\s\S]*?\}\);/,
        patched
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[patch-vue-pdf] Successfully patched.');
} else {
    console.log('[patch-vue-pdf] Pattern not found, skipping.');
}

