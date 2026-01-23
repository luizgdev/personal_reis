const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../public/index.html');

try {
    let content = fs.readFileSync(indexPath, 'utf8');

    // Remove CDN script
    const cdnScriptRegex = /\s+<!-- Confetti -->\s+<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/canvas-confetti@1\.6\.0\/dist\/confetti\.browser\.min\.js"><\/script>/g;
    content = content.replace(cdnScriptRegex, '');

    // Remove initialization script block
    // We look for the specific block added for confetti
    const initScriptRegex = /\s+<!-- Custom Scripts -->\s+<script>\s+\/\/ Trigger confetti on load\s+window\.addEventListener\('load', \(\) => \{[\s\S]*?\}\);\s+\/\/ Add confetti to CTA buttons\s+document\.querySelectorAll\('\.js-whatsapp-join'\)\.forEach\(button => \{[\s\S]*?\}\);\s+<\/script>/g;

    // Alternative regex if the above is too strict, but we want to be safe to only remove the specific confetti code
    // Let's try to match exactly what we added

    content = content.replace(initScriptRegex, '');

    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('Successfully removed confetti scripts from index.html');

} catch (err) {
    console.error('Error processing file:', err);
    process.exit(1);
}
