const log4js = require('log4js');

// // Configure log4js
// log4js.configure({
//     appenders: {
//         file: { type: 'file', filename: 'app.log' },
//         console: { type: 'console' }
//     },
//     categories: {
//         default: { appenders: ['file', 'console'], level: 'debug' }
//     }
// });

// // Export the logger instance
// module.exports = log4js.getLogger();



const path = require('path');

// Function to generate a unique log file name
function generateLogFileName() {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); // Replace colons with hyphens to ensure valid file name
    return `app-${timestamp}.log`;
}

// Configure log4js with dynamic file name
log4js.configure({
    appenders: {
        file: { type: 'file', filename: path.join(__dirname, 'logs', generateLogFileName()) }, // Use dynamic file name
        console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'debug' }
    }
});

// Export the logger instance
module.exports = log4js.getLogger();
 