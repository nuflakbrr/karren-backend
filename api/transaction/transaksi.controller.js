const { add, del, get, getId, update } = require("./transaksi.service")

const controllerAdd = (req, res) => {
    var now = new Date()
    var jsonDate = now.toJSON()
    var then = new Date(jsonDate)

    var duration = req.body.duration
    var back = new Date(
        now.getUTCFullYear(),
        now.getMonth(),
        then.getDate() + duration,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    )

    data_transaction = {
        id_member: req.body.id_member,
        id_car: req.body.id_car,
        id_user: req.body.id_user,
        date: then,
        deadline: back,
        date_pay: then,
        status: req.body.status,
        payment: req.body.payment
    }

    add(data_transaction, (err, result) => {
        if (err) {
            if (err === "Cars Not Found") {
                return res.json({
                    message: "Cars Not Found"
                })
            }

            if (err === "Cars Not Available") {
                return res.json({
                    message: "Cars Not Available"
                })
            }

            if (err === "Member Not Found") {
                return res.json({
                    message: "Member Not Found"
                })
            }

            if (err === "User Not Found") {
                return res.json({
                    message: "User Not Found"
                })
            }

            console.log(err)
            return
        } else {
            return res.json({
                success: 1,
                data: result
            })
        }
    })
}

const controllerGet = (req, res) => {
    get((err, result) => {
        if (err) {
            console.log(err)
            return
        } else {
            return res.json({
                success: 1,
                data: result
            })
        }
    })
}

const controllerGetId = (req, res) => {
    const body = req.body.id

    getId(body, (err, result) => {
        if (err) {
            console.log(err)
            return
        } else if (!result) {
            return res.json({
                success: 0,
                message: "Data Not Found"
            })
        } else {
            return res.json({
                success: 1,
                data: result
            })
        }
    })
}

const controllerUpdate = (req, res) => {
    data_transaction = {
        id: req.body.id,
        id_member: req.body.id_member,
        id_car: req.body.id_car,
        id_user: req.body.id_user,
        date: req.body.date,
        deadline: req.body.deadline,
        date_pay: req.body.date_pay,
        status: req.body.status,
        payment: req.body.payment
    }

    update(data_transaction, (err, result) => {
        if (err) {
            console.log(err)
            return
        } else if (!result) {
            return res.json({
                success: 0,
                message: "Data Not Found"
            })
        } else {
            return res.json({
                success: 1,
                data: result
            })
        }
    })
}

const controllerDelete = (req, res) => {
    const body = req.body.id

    del(body, (err, result) => {
        if (err) {
            console.log(err)
            return
        } else if (!result) {
            return res.json({
                success: 0,
                message: "Data Not Found"
            })
        } else {
            return res.json({
                success: 1,
                data: result
            })
        }
    })
}

module.exports = {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete
}