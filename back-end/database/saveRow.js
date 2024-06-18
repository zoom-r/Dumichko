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

// async function saveRow(rowId, row, id) {
//     try{
//         let name;
//         switch(rowId){
//             case "row-1":
//                 name = "first";
//                 break;
//             case "row-2":
//                 name = "second";
//                 break;
//             case "row-3":
//                 name = "third";
//                 break;
//             case "row-4":
//                 name = "fourth";
//                 break;
//             case "row-5":
//                 name = "fifth";
//                 break;
//             case "row-6":
//                 name = "sixth";
//                 break;
//             default:
//                 name = "first";
//                 break;
//         }
//         const sql = 'UPDATE `current_progress` SET `:name` = :row WHERE `id` =:id';
//         const values = {
//             name: name,
//             row: row,
//             id: id
//         };
        
//         const [result, fields] = await connection.execute(sql, values);
        
//         console.log(result);
//         console.log(fields);
//     }
//     catch(err){
//         console.error(err);
//         saveRow(rowId, row, id);
//     }
// }

// module.exports = saveRow;

