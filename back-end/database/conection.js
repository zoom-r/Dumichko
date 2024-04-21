const database = require('mysql2');
database.createConnection({
    host: 'dumichko-dumichko-5d95.j.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_8RhJct6M7c627FM_TxD',
    database: 'defaultdb',
    port: '14843',
    ssl: {
        ca: 'ca.pem'
    }
});
module.exports = database;