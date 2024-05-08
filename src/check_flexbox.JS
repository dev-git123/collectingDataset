const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const COUNT = 0;

// Function to check if a webpage uses flexbox layout
async function checkFlexboxLayout(url) {
  try {
    // Fetch the HTML content of the webpage
    const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML content using Cheerio
    const $ = cheerio.load(html);

    // Check if flexbox layout is used
    const isFlexboxUsed = $('body').css('display').includes('flex');

    return isFlexboxUsed;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

// Read website URLs from CSV and determine if they use flexbox layout
fs.createReadStream('urlsThatUseFlexBox.XLSX') //urlsThatUseFlexBox.XLSX , urls.csv
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