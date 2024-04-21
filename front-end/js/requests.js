const axios = require('axios');

function checkEnteredLetters(letters){
    
    function checkWord(data){

    }

    axios.post('/check', {
        letters: letters
    })
    .then(function(response){
        checkWord(response.data);
    })
    .catch(function(error){
        console.log(error);
    });

}

function saveRow(rowId, row){
    const response = axios.post('/save', {
        rowId: rowId,
        row: row,
        id: userId
    });
}

// TODO: Implement the following functions
function LogIn(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    axios.post('/check', {
        email: email,
        password: password
    })

}

function SignUp(){

}