const fs = require('fs');
const csv = require('csv-parser');

const all_words = [];

fs.createReadStream('/path/to/w_words.csv')
    .pipe(csv())
    .on('data', (row) => {
        all_words.push(row[1]);
    }
);
const words = all_words.filter((word) => word.length == 5);
