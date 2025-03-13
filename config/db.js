// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345', 
    database: 'restaurante_db',
});

module.exports = pool;
