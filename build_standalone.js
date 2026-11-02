const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const styleCss = fs.readFileSync(path.join(baseDir, 'style.css'), 'utf-8');
const scriptJs = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf-8');
let configJs = fs.readFileSync(path.join(baseDir, 'config.js'), 'utf-8');

const introB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(baseDir, 'assets/images/intro.jpg')).toString('base64');
const preludeB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(baseDir, 'assets/images/prelude.jpg')).toString('base64');
const confessB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(baseDir, 'assets/images/confess.jpg')).toString('base64');
const resultB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(baseDir, 'assets/images/result.jpg')).toString('base64');
const yayB64 = 'data:audio/mp3;base64,' + fs.readFileSync(path.join(baseDir, 'assets/audio/yay.mp3')).toString('base64');

// Replace relative asset paths in config for standalone bundle
configJs = configJs
  .replace("'assets/images/intro.jpg'", JSON.stringify(introB64))
  .replace("'assets/images/prelude.jpg'", JSON.stringify(preludeB64))
  .replace("'assets/images/confess.jpg'", JSON.stringify(confessB64))
  .replace("'assets/images/result.jpg'", JSON.stringify(resultB64))
  .replace("'assets/audio/yay.mp3'", JSON.stringify(yayB64));

let indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

// Replace stylesheet link with inline style
indexHtml = indexHtml.replace(
  '<link rel="stylesheet" href="style.css">',
  `<style>\n${styleCss}\n</style>`
);

// Replace relative asset paths in HTML img & audio tags
indexHtml = indexHtml
  .replace('src="assets/images/intro.jpg"', `src="${introB64}"`)
  .replace('src="assets/images/prelude.jpg"', `src="${preludeB64}"`)
  .replace('src="assets/images/confess.jpg"', `src="${confessB64}"`)
  .replace('src="assets/images/result.jpg"', `src="${resultB64}"`)
  .replace('src="assets/audio/yay.mp3"', `src="${yayB64}"`);

// Replace script tags with inline scripts
indexHtml = indexHtml.replace(
  '<script src="config.js"></script>\n  <script src="script.js"></script>',
  `<script>\n${configJs}\n</script>\n  <script>\n${scriptJs}\n</script>`
);

fs.writeFileSync(path.join(baseDir, 'standalone.html'), indexHtml, 'utf-8');
console.log('standalone.html successfully built! Size:', fs.statSync(path.join(baseDir, 'standalone.html')).size, 'bytes');
