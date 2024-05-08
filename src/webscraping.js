const puppeteer = require('puppeteer');
const fs = require('fs');

// Function to extract HTML and CSS
async function extractHTMLAndCSS(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract HTML
    const html = await page.content();

    // Extract CSS
    const styles = await page.evaluate(() => {
        const styleTags = Array.from(document.querySelectorAll('style'));
        const css = styleTags.map(tag => tag.textContent).join('\n');
        return css;
    });

    await browser.close();

    return { html, styles };
}

// Main function
async function main() {
    try {
        const url = 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'; // Replace with your desired URL
        const { html, css } = await extractHTMLAndCSS(url);

        // Write HTML to file
        fs.writeFileSync('output.html', html);
        console.log('HTML saved to output.html');

        // Write CSS to file
        fs.writeFileSync('styles.css', css);
        console.log('CSS saved to styles.css');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main();