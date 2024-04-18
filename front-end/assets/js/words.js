// Purpose: to fetch the words from the csv file and filter the words with 5 letters

function fetchWords() {
    const words = [];
    fetch('../assets/files/words.csv')
        .then(response => response.text())
        .then(data => {
            const results = Papa.parse(data, { header: false });
            results.data.forEach(row => {
                const word = row[0]; // Access the second column by its index
                words.push(word);
            });
        });
    return words;
}

const words = fetchWords();