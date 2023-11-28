const session = require('express-session');
const MySQLStore = require('express-mysql-session') (session);

const sessionStore = new MySQLStore({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: 3306
});

module.exports = sessionStore;