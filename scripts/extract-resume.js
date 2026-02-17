const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extract() {
  const data = new Uint8Array(fs.readFileSync('./public/piyush_joshi_cv.pdf'));
  const loadingTask = pdfjsLib.getDocument({ data });
  const doc = await loadingTask.promise;
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n\n';
  }
  console.log('-----PDF TEXT START-----');
  console.log(fullText);
  console.log('-----PDF TEXT END-----');
}

extract().catch(err => { console.error('ERR', err); process.exit(1); });
