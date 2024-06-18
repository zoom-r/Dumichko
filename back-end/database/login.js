//const connection = require('./conection.js');
const mysql = require('mysql2/promise');
const path = require('path'); 
const bcrypt = require('bcrypt');

async function createConnection(){
    try{
        const connection = await mysql.createConnection({
            host: 'dumichko-dumichko-5d95.j.aivencloud.com',
            user: 'avnadmin',
            password: 'AVNS_8RhJct6M7c627FM_TxD',
            database: 'defaultdb',
            port: '14843',
            ssl: {
                ca: path.resolve(__dirname, '../../ca.pem'),
                rejectUnauthorized: false
            }
        });
        return connection;
    }catch(err){
        console.log(err);
        return null;
    }
}


async function checkUser(email, password){
    try{
        //check if email exists in the database
        const sql = 'SELECT `password` FROM `users` WHERE `email` = ?';
        const values = [email];
        const [result, fields] = await connection.execute(sql, values);
        
        // TODO: Check if the password is correct
        try{
            bcrypt.compare(password, result[0].password, function(err, res) {
                if(err){
                    console.log(err);
                } else {
                    return res;
                }
            });
        }
        catch{
            return 'Грешна парола!';
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



async function checkEmail(email) {
    const connection = await createConnection();
    const sql = 'SELECT `email` FROM `users` WHERE `email` = ?';
    const values = [email];
    try {
        const [result, fields] = await connection.execute(sql, values);
        console.log(result);
        if (result.length > 0) {
            return true; // Email exists
        } else {
            return false; // Email does not exist
        }
    } catch (err) {
        console.error(err);
        throw err; // It's better to throw the error or handle it appropriately
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

module.exports = {
    checkUser,
    checkEmail,
    encryptPassword
  };