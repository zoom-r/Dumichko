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


module.exports = createConnection();