const db = require("../../config/db")

const add = (data, callBack) => {
    db.query(`SELECT * FROM cars WHERE id = ?`, [data.id], (err, result) => {
        if (err) {
            console.log(err)
            return
        } else if (!result[0]) {
            return callBack("Cars Not Found")
        } else if (result[0].stock < 1) {
            return callBack("Cars Not Available")
        } else {
            db.query(`SELECT id FROM member WHERE id = ?`, [data.id], (err, result) => {
                if (err) {
                    console.log(err)
                    return
                } else if (!result[0]) {
                    return callBack("Member Not Found")
                } else {
                    db.query(`SELECT id FROM user WHERE id = ?`, [data.id], (err, result) => {
                        if (err) {
                            console.log(err)
                            return
                        } else if (!result[0]) {
                            return callBack("User Not Found")
                        } else {
                            db.query(`INSERT INTO transaction SET ?`, [data], (err, result) => {
                                if (err) {
                                    return callBack(err)
                                } else {
                                    db.query(`SELECT * FROM cars WHERE id = ?`, [data.id], (err, result) => {
                                        if (err) {
                                            console.log(err)
                                            return
                                        } else {
                                            hasil = result[0].stock - 1
                                            db.query(`UPDATE cars SET stock = ? WHERE id = ?`, [hasil, data.id])
                                        }
                                    })
                                }
                                return callBack(null, result)
                            })
                        }
                    })
                }
            })
        }
    })
}

const get = (callBack) => {
    db.query(`SELECT * FROM transaction`, (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, result[0])
        }
    })
}

const getId = (data, callBack) => {
    db.query(`SELECT * FROM transaction WHERE id = ?`, [data], (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, result[0])
        }
    })
}

const update = (data, callBack) => {
    db.query(`SELECT * FROM transaction WHERE id = ?`, [data], (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`UPDATE transaction SET ? WHERE id = ?`, [data, data.id])
            return callBack(null, result[0])
        }
    })
}

const del = (data, callBack) => {
    db.query(`SELECT id FROM transaction WHERE id = ?`, [data.id], (err, result) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`DELETE FROM transaction WHERE id = ?`, [data.id], (err, result) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`SELECT * FROM cars WHERE id = ?`, [data.id], (err, result) => {
                        if (err) {
                            console.log(err)
                            return callBack(err)
                        } else {
                            hasil = result[0].stock + 1
                            db.query(`UPDATE cars SET stock = ? WHERE id = ?`, [hasil, data.id])
                        }
                    })
                    return callBack(null, result[0])
                }
            })
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