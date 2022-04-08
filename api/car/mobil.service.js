const db = require('../../config/db')

const add = (data, callback) => {
    db.query(`INSERT INTO cars SET ?`, [data], (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}

const get = (callback) => {
    db.query(`SELECT * FROM cars`, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}

const getId = (data, callback) => {
    db.query(`SELECT * FROM cars WHERE id = ?`, [data], (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}

const update = (data, callback) => {
    db.query(`SELECT * FROM cars WHERE id = ?`, [data.id], (err, result) => {
        if (err) {
            return callback(err)
        } else {
            db.query(`UPDATE cars SET ? WHERE id = ?`, [data, data.id])
            return callback(null, result[0])
        }
    })
}

const del = (data, callback) => {
    db.query(`SELECT id FROM cars WHERE id = ?`, [data], (err, result) => {
        if (err) {
            callback(err)
        } else {
            db.query(`DELETE FROM cars WHERE id = ?`, [data])
            callback(null, result[0])
        }
    })
}

module.exports = {
    add,
    get,
    getId,
    update,
    del
}