const mysql = require('mysql2');
require('dotenv').config();

// Create a single database connection
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'srisync',
    port: 3306
});

// Function to get the database connection
const connect = () => {
    dbConnection.connect((err) => {
        if (err) {
            console.log('Error connecting to database: ', err.stack);
            return;
        }
        console.log('Successfully connected to the database');
    });
};

// This function will be used to get the connection for querying
const connect2 = () => {
    return dbConnection;
};

module.exports = { connect, connect2 };
