let words;
let wordOfTheDay;

axios.get('http://localhost:3000/keys/words')
    .then(function(response){
        const secretKey = response.data;
        axios.get('http://localhost:3000/game/word')
        .then(function(response2){
            // words = response.data.words;
            // wordOfTheDay = response.data.word;
            const data = decryptData(response2.data, secretKey);
            words = data.words;
            wordOfTheDay = data.word;
        })
        .catch(function(error){
            console.log(error);
        });
    });

function decryptData(encryptedData, secretKey) {
    try {
        const algorithm = 'aes-256-cbc';

        // Ensure IV and content are hex-encoded
        const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
        const encryptedText = CryptoJS.enc.Hex.parse(encryptedData.content);

        // Ensure the secret key is hex and of correct length (32 bytes for AES-256)
        const key = CryptoJS.enc.Hex.parse(secretKey);
        if (secretKey.length !== 64) { // 32 bytes * 2 hex characters per byte
            throw new Error('Secret key length is incorrect. Expected 32 bytes.');
        }

        // Decrypt
        const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText }, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        // Convert decrypted data to a string
        const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedStr) {
            throw new Error('Decryption failed or resulted in empty string.');
        }

        // Assuming the original data was a JSON object, parse it back to an object
        return JSON.parse(decryptedStr);
    } catch (e) {
        console.error("Error during decryption or parsing:", e.message);
        return null; // Or handle the error as appropriate
    }
}

//TODO: Implement saving the row to the database
function saveRow(rowId, row){
    console.log('Sending row to the server');
    axios.post('http://localhost:3000/game/save', {
        rowId: rowId,
        row: row,
        id: getUser().id
    }).then(response => {
        console.log(response);
    });
}
