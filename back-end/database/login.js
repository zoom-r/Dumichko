import connection from './conection.js';
const bcrypt = require('bcrypt');

async function checkUser(email, password){
    try{
        //check if email exists in the database
        const sql = 'SELECT `password` FROM `users` WHERE `email` = ?';
        const values = [username];
        const [result, fields] = await connection.execute(sql, values);
        
        // TODO: Check if the password is correct
        try{

        }
        catch{

        }
        //

        console.log(result);
        console.log(fields);
    }
    catch(err){
        console.error(err);
        return 'Акаунтът не съществува!';
    }
}

function encryptPassword(password) {
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) {
            console.log(err);
        } else {
            return hash;
        }
    });
}

module.exports = checkUser, encryptPassword;