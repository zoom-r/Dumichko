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

async function saveRow(rowId, row, id, won) {
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

        if(won){
            const sql2 = 'UPDATE `current_progress` SET `won` = 1 WHERE `id` = ?';
            const values2 = [resultId[0].id_progress];
            const [result2, fields2] = await connection.execute(sql2, values2);
        }

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

        const sql2 = 'SELECT `won` FROM `current_progress` WHERE `id` = ?';
        const values2 = [resultId[0].id_progress];
        const [result2, fields2] = await connection.execute(sql2, values2);
        switch(result2[0].won){
            case 0:
                var won = false;
                break;
            case 1:
                var won = true;
                break;
            default:
                var won = false;
                break;
        }
        return {result, won};
    }
    catch(err){
        console.error(err);
        return null;
    }
}

async function eraseProgress(){
    try{
        const connection = await createConnection();
        const getIds = 'SELECT `id_progress` FROM `users`';
        const [resultIds, fieldsIds] = await connection.execute(getIds);
        resultIds.forEach(async (resultId) => {
            const sql = 'UPDATE `current_progress` SET `first` = null, `second` = null, `third` = null, `fourth` = null, `fifth` = null, `sixth` = null, `won` = 0 WHERE `id` = ?';
            const values = [resultId.id_progress];
            const [result, fields] = await connection.execute(sql, values);
        });
        return true;
    }
    catch(err){ 
        console.error(err);
        return false;
    }
}
 
module.exports = {saveRow, readRows, eraseProgress};

