const { add, del, get, getId, update } = require("./mobil.service")

const controllerAdd = (req, res) => {
    data_car = {
        type: req.body.type,
        year: req.body.year,
        price: req.body.price,
        photo: req.body.photo,
        stock: req.body.stock
    }

    add(data_car, (err, result) => {
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
    const body = req.params.id

    getId(body, (err, result) => {
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

const controllerUpdate = (req, res) => {
    data_car = {
        id: req.body.id,
        type: req.body.type,
        year: req.body.year,
        price: req.body.price,
        photo: req.body.photo,
        stock: req.body.stock
    }

    update(data_car, (err, result) => {
        if (err) {
            console.log(err)
            return
        } else if (!result) {
            return res.json({
                success: 0,
                message: "Not Found"
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
                message: "Not Found"
            })
        } else {
            return res.json({
                success: 1,
                message: "Data Deleted"
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