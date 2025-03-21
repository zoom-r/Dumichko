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
        const connection = await createConnection();
        //check if email exists in the database
        const sql = 'SELECT `password` FROM `users` WHERE `email` = ?';
        const values = [email];
        const [result, fields] = await connection.execute(sql, values);
        try{
            const resultCompare = await bcrypt.compare(password, result[0].password);
            const [result2, fields2] = await connection.execute('SELECT `id` FROM `users` WHERE `email` = ?', [email]);
            if(resultCompare)
                return {result: resultCompare, id:result2[0].id};
            else
                return {result: resultCompare};
        }catch(error){
            console.log(error);
            return {result: false};
        }
    }
    catch(err){
        console.error(err);
        return {result: false};
    }
}

async function checkEmail(email) {
    const connection = await createConnection();
    const sql = 'SELECT `email` FROM `users` WHERE `email` = ?';
    const values = [email];
    try {
        const [result, fields] = await connection.execute(sql, values);
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

async function encryptPassword(password) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.log(err);
        throw err; // Rethrow the error to be handled by the caller
    }
}

async function createTables(){
    const connection = await createConnection();
    const sql = 'INSERT INTO `distribution` (`first`, `second`, `third`, `fourth`, `fifth`, `sixth`) VALUES (0,0,0,0,0,0);';
    const sql2 = 'INSERT INTO `current_progress` (`first`, `second`, `third`, `fourth`, `fifth`, `sixth`) VALUES (null,null,null,null,null,null);';
    const sql3 = 'INSERT INTO `stats` (`id_guesses`) VALUE (?)'
    try {
        const [result, fields] = await connection.execute(sql);
        const [result2, fields2] = await connection.execute(sql2);
        const [result3, fields3] = await connection.execute(sql3, [result.insertId]); // Assuming you meant to pass the first row of the first result as a parameter
        // Assuming the first column of the first row contains the ID you're interested in
        return {id_progress: result2.insertId, id_stats: result3.insertId};
    } catch (err) {
        console.error(err);
        throw err; // It's better to throw the error or handle it appropriately
    }

}


async function saveUser(email, password){
    const connection = await createConnection();
    const sql = 'INSERT INTO `users` (`email`, `password`, `id_stats`, `id_progress`) VALUES (?, ?, ?, ?)';
    const ids = await createTables();
    const values = [email, password, ids.id_stats, ids.id_progress];
    try {
        const [result, fields] = await connection.execute(sql, values);
        return {result: true, id: result.insertId};
    } catch (err) {
        console.error(err);
        return {result: false}; // It's better to throw the error or handle it appropriately
    }
}


module.exports = {
    checkUser,
    checkEmail,
    encryptPassword,
    saveUser
  };