/* eslint-disable no-undef */
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lint.json', 'utf8'));
data.filter(d => d.errorCount > 0).forEach(d => {
    console.log(d.filePath);
    d.messages.forEach(m => console.log(`  ${m.line}:${m.column} ${m.message}`));
});
