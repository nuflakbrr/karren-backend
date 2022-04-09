const mysql = require('mysql2')

// const db = createPool({
//     host: process.env.DB_HOST_CLOUD,
//     user: process.env.DB_USER_CLOUD,
//     password: process.env.DB_PASS_CLOUD,
//     database: process.env.DB_NAME_CLOUD,
//     connectionLimit: 10
// })

const db = mysql.createConnection(process.env.DB_CLOUD_PROD || process.env.DB_CLOUD_DEV)
db.connect()

module.exports = db