//adding Puppeteer library
const pt = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const fileName = 'outputs/websites_that_use_flexbox(outputOf13_05_2024).txt';
async function processLineByLine() {
    const fileStream = fs.createReadStream(fileName);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      console.log(`Line from file: ${line}`);
      const fileName = line.substring(
        line.indexOf("/") + 1, 
        line.lastIndexOf(".")
    );
//     pt.launch().then(async browser => {
//         //browser new page
//         const p = await browser.newPage();
//         //set viewpoint of browser page
//         await p.setViewport({ width: 1000, height: 500 })
//         //launch URL
//         await p.goto(line)
//         //capture screenshot
//         await p.screenshot({
//         path: 'outputs/screenshots/'+fileName+'.png'
//         });
//         //browser close
//         await browser.close()
//         })
   
}
    }
  
  processLineByLine();



