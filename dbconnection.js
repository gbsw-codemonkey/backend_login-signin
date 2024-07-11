const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "swgo",
    port: 3306
});

module.exports = dbConnection;