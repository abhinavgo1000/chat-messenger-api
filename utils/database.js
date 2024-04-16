const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'userdata',
    password: 'Test@123'
});

module.exports = pool.promise();
