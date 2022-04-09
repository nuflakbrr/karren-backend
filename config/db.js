const { createPool } = require('mysql')
const mysql = require('mysql2')

// LOCAL SQL
const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
})

// CLOUD SQL
// const db = mysql.createConnection(process.env.DB_CLOUD_PROD || process.env.DB_CLOUD_DEV)
// db.connect()

module.exports = db