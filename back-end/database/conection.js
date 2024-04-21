import mysql from 'mysql2/promise';
let connection;
try{
    connection = await mysql.createConnection({
        host: 'dumichko-dumichko-5d95.j.aivencloud.com',
        user: 'avnadmin',
        password: 'AVNS_8RhJct6M7c627FM_TxD',
        database: 'defaultdb',
        port: '14843',
        ssl: {
            ca: 'ca.pem'
        }
    });
}catch(err){
    console.log(err);
}

module.exports = connection;