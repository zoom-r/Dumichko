// Purpose: to fetch the words from the csv file and filter the words with 5 letters
function fetchWords() {
    const fiveLetterWords = [];
    fetch('./assets/files/w_words.csv')
        .then(response => response.text())
        .then(data => {
            const results = Papa.parse(data, { delimiter: ";", header: false });
            results.data.forEach(row => {
                const word = row[1]; // Access the second column by its index
                if (word && word.length == 5) {
                    fiveLetterWords.push(word);
                }
            });
        });
    return fiveLetterWords;
}
