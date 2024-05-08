const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const COUNT = 0;

// Function to check if a webpage uses flexbox layout
async function checkFlexboxLayout(url) {
  try {
   console.log("urls..", url)
    // Fetch the HTML content of the webpage
    const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
  });
    
    const html = response.data;
    console.log("html..", html)

    // Parse the HTML content using Cheerio
    const $ = cheerio.load(html);
    //console.log("response..", $('body'))
    // Check if flexbox layout is used
    // const isFlexboxUsed = $('body').css('display').includes('flex');
    // Check if any element uses flexbox layout
    let isFlexboxUsed = false;
    $('*').each((index, element) => {
      const displayValue = $(element).css('display');
      if (displayValue && displayValue.includes('flex')) {
        isFlexboxUsed = true;
        return isFlexboxUsed; // Stop iteration early if flexbox is found
      }
      return isFlexboxUsed;
    });

    return isFlexboxUsed;
  } catch (error) {
    // console.error('Error:', error);
    return false;
  }
}

// Read website URLs from CSV and determine if they use flexbox layout
fs.createReadStream('urlsThatUseFlexBox.csv') //urlsThatUseFlexBox.xlsx , urls.csv
  .pipe(csv())
  .on('data', async (data) => {
    const url = data['websites'];

    // Check if the webpage uses flexbox layout
    const isFlexboxLayout = await checkFlexboxLayout(url);
    if(isFlexboxLayout) COUNT = COUNT +1
    // Print the result
    
  })
  .on('end', () => {
    console.log('CSV file processed', COUNT);
  });