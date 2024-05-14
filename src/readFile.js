const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('urls.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Push the second column value to the results array
    results.push(data['websites']); // Replace 'column_name' with the actual name of the second column
  })
  .on('end', () => {
    console.log(results);
    results.map( x -> x)
  });