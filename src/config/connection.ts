import mysql from 'promise-mysql';
export const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'karla',
    password: 'karla_bebe',
    database: 'apliweb'
});
