const mysql = require('mysql2/promise');
const path = require('path');

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

async function saveRow(rowId, row, id) {
    try{
        const connection = await createConnection();
        console.log('Created connection')

        let name;
        switch(rowId){
            case "row-1":
                name = "first";
                break;
            case "row-2":
                name = "second";
                break;
            case "row-3":
                name = "third";
                break;
            case "row-4":
                name = "fourth";
                break;
            case "row-5":
                name = "fifth";
                break;
            case "row-6":
                name = "sixth";
                break;
            default:
                name = "first";
                break;
        }

        const getId = 'SELECT `id_progress` FROM `users` WHERE `id` = ?';
        const valuesId = [id];
        const [resultId, fieldsId] = await connection.execute(getId, valuesId);
        console.log(resultId)

        const sql = `UPDATE \`current_progress\` SET ${name} = ? WHERE \`id\` = ?`;
        const values = [row, resultId[0].id_progress];
        
        const [result, fields] = await connection.execute(sql, values);
        console.log(result, fields);
        return true;
    }
    catch(err){
        console.error(err);
        return false;
        //saveRow(rowId, row, id);
    }
}

async function readRows(id){
    try{
        const connection = await createConnection();
        const getId = 'SELECT `id_progress` FROM `users` WHERE `id` = ?';
        const valuesId = [id];
        const [resultId, fieldsId] = await connection.execute(getId, valuesId);

        const sql = 'SELECT `first`, `second`, `third`, `fourth`, `fifth`, `sixth` FROM `current_progress` WHERE `id` = ?';
        const values = [resultId[0].id_progress];
        const [result, fields] = await connection.execute(sql, values);
        console.log(result)
        return result;
    }
    catch(err){
        console.error(err);
        return null;
    }
}

module.exports = {saveRow, readRows};

