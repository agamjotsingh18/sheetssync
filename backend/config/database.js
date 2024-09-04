const mysql = require('mysql2');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection;
if (process.env.DB_TYPE === 'mysql') {
  connection = mysql.createConnection(dbConfig);
} else if (process.env.DB_TYPE === 'postgresql') {
  connection = new Client(dbConfig);
  connection.connect();
}

module.exports = connection;
