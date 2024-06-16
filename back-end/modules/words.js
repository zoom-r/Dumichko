const path = require('path');
const Papa = require('papaparse');
const fs = require('fs').promises; // Use the promise-based version of fs

async function fetchWords() {
    try {
        const filePath = path.resolve(__dirname, '../files/words.csv');
        const fileContent = await fs.readFile(filePath, 'utf8'); // Read file asynchronously
        const results = Papa.parse(fileContent, { header: false });
        const words = results.data.map(row => row[0]); // Assuming words are in the first column
        return words;
    } catch (error) {
        console.error('Error fetching words:', error);
        return []; // Return an empty array in case of error
    }
}

// Immediately Invoked Function Expression (IIFE) to export the result of fetchWords
// Export the fetchWords function directly
module.exports = fetchWords;