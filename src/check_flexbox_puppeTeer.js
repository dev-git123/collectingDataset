const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');
const logger = require('./loggerConfig');
// const input_file = "inputs/PhiUSIIL_Phishing_URL_Dataset.csv";
const input_file = "inputs/PhiUSIIL_Phishing_URL_Dataset(1)_14_05_2024.csv";
const output_flex_websites = "outputs/websites_that_use_flexbox.txt";
const output_no_flex_websites = "outputs/websites_that_does_not_use_flexbox.txt";
const output_error_websites = "outputs/websites_with_errors.txt";

// Function to extract HTML and CSS from a given URL
async function extractHTMLAndCSS(url) {
    try {
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
    } catch (error) {
        // Handle any errors that occur during HTML and CSS extraction
        console.error('Error extracting HTML and CSS:', error);
        logger.error('Error extracting HTML and CSS:', error);
        fs.appendFile(output_error_websites, url + "\n", (err) => {
            if (err)
                return console.log(err);
        });
        return { html: '', styles: '' }; // Return empty strings in case of an error
    }

}

// Function to count the number of websites using flexbox layout from a CSV file
async function countFlexBox(file) {

    let count = 0;
   
    const readStream = fs.createReadStream(file);
    for await (const data of readStream.pipe(csv())) {
        const url = data['websites'];

        // Check if the webpage uses flexbox layout
        var { html, styles } = await extractHTMLAndCSS(url)
        logger.debug(url , ":" , styles.includes("display:flex") ? ' use flex layout' : 'does not use flex layout')
        if (html.includes("display: flex") || styles.includes("display: flex") ||
            html.includes("display:flex") || styles.includes("display:flex")) {
            count++;
            fs.appendFile(output_flex_websites, url + "\n", (err) => {
                if (err)
                    return console.log(err);
            });
        }else{
            fs.appendFile(output_no_flex_websites, url + "\n", (err) => {
                if (err)
                    return console.log(err);
            });
        }
    }


    console.log('CSV file successfully processed');
    logger.debug("...................CSV file successfully processed.......................")
    return count;
}

// Main function
function main() {
    try {
        logger.debug("...................Application Starts.......................")
        // Count the number of websites using flexbox layout
        countFlexBox(input_file).then(result => {
            console.log(`Number of websites using flexbox layout: ${result}`);

        })


    } catch (error) {
       
        console.error('Error:', error);
    }
}

// Run the main function
main();
