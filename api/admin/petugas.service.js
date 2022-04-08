const db = require("../../config/db")

const add = (data, callBack) => {
    db.query("INSERT INTO user SET ?", [data], (err, result) => {
        if (!err) {
            return callBack(null, result)
        } else {
            return callBack(err)
        }
    })
}

const get = (callBack) => {
    db.query(`SELECT * FROM user`, [], (err, result) => {
        if (!err) {
            return callBack(null, result)
        } else {
            return callBack(err)
        }
    })
}

const getId = (data, callBack) => {
    db.query(`SELECT * FROM user WHERE id = ?`, [data], (err, result) => {
        if (!err) {
            return callBack(null, result)
        } else {
            return callBack(err)
        }
    })
}

const update = (data, callBack) => {
    db.query(`SELECT * FROM user WHERE id = ?`, [data.id], (err, result) => {
        if (!err) {
            db.query(`UPDATE user SET ? WHERE id = ?`, [data, data.id])
            return callBack(null, result[0])
        } else {
            return callBack(err)
        }
    })
}

const del = (data, callBack) => {
    db.query(`SELECT id FROM user WHERE id = ?`, [data], (err, result) => {
        if (!err) {
            db.query(`DELETE FROM user WHERE id = ?`, [data])
            return callBack(null, result[0])
        } else {
            return callBack(err)
        }
    })
}

const serviceGetUserByEmail = (email, callBack) => {
    db.query(`SELECT * FROM user WHERE email = ?`, [email], (err, result) => {
        if (!err) {
            return callBack(null, result[0])
        } else {
            return callBack(err)
        }
    })
}

module.exports = {
    add,
    get,
    getId,
    update,
    del,
    serviceGetUserByEmail
}