const mysql = require('mysql');
require('dotenv').config()

const db = mysql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: 3306
})

db.connect((err) => {
    if(err) {
        console.log("Error in Connection to the database");
        return;
    }
    else {
        console.log("Database connected");
    }
})

module.exports = db;
