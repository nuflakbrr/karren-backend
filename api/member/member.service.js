const db = require("../../config/db")

const add = (data, callBack) => {
    db.query(`INSERT INTO member SET ?`, [data], (err, result) => {
        if (err) {
            return callBack(err)
        }
        return callBack(null, result)
    })
}

const get = (callBack) => {
    db.query(`SELECT * FROM member`, [], (err, result) => {
        if (err) {
            return callBack(err)
        }
        return callBack(null, result)
    })
}

const getId = (data, callBack) => {
    db.query(`SELECT * FROM member WHERE id = ?`, [data], (err, result) => {
        if (err) {
            return callBack(err)
        }
        return callBack(null, result)
    })
}

const update = (data, callBack) => {
    db.query(`SELECT * FROM member WHERE id = ?`, [data.id], (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`UPDATE member SET ? WHERE id = ?`, [data, data.id])
            return callBack(null, result[0])
        }
    })
}

const del = (data, callBack) => {
    db.query(`SELECT id FROM member WHERE id = ?`, [data], (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`DELETE FROM member WHERE id = ?`, [data])
            return callBack(null, result[0])
        }
    })
}

const serviceGetUserByEmail = (email, callBack) => {
    db.query(`SELECT * FROM member WHERE email = ?`, [email], (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, result[0])
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