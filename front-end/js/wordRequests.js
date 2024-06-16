let words;
let wordOfTheDay;
axios.get('http://localhost:3000/keys/words')
    .then(function(response){
        const secretKey = response.data;
        axios.get('http://localhost:3000/game/word')
        .then(function(response){
            // words = response.data.words;
            // wordOfTheDay = response.data.word;
            const data = decryptData(response.data, secretKey);
            words = data.words;
            wordOfTheDay = data.word;
        })
        .catch(function(error){
            console.log(error);
        });
    });

function decryptData(encryptedData, secretKey) {
    // The secretKey needs to be the same as the one used for encryption on the server
    const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
    const encryptedText = CryptoJS.enc.Hex.parse(encryptedData.content);

    // Convert the secret key from Hex
    const key = CryptoJS.enc.Hex.parse(secretKey);

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Convert decrypted data to a string
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedStr); // Assuming the original encrypted data was a JSON string
}

//TODO: Implement saving the row to the database
function saveRow(rowId, row){
    const response = axios.post('/save', {
        rowId: rowId,
        row: row,
        id: userId
    });
}

// function checkEnteredLetters(letters){
    
//     function checkWord(data){

//     }

//     axios.post('/check', {
//         letters: letters
//     })
//     .then(function(response){
//         checkWord(response.data);
//     })
//     .catch(function(error){
//         console.log(error);
//     });

// }



// function saveRow(rowId, row){
//     const response = axios.post('/save', {
//         rowId: rowId,
//         row: row,
//         id: userId
//     });
// }

// // TODO: Implement the following functions
// function LogIn(){
//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;
//     axios.post('/check', {
//         email: email,
//         password: password
//     })

// }

// function SignUp(){

// }