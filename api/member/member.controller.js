const { add, del, get, getId, update, serviceGetUserByEmail } = require("./member.service")

const controllerAdd = (req, res) => {
    const data_member = {
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    add(data_member, (err, result) => {
        if (err) {
            console.log(err)
            return
        } else {
            return res.json({
                success: 1,
                data: result,
                data_member
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
        } else {
            return res.json({
                success: 1,
                data: result
            })
        }
    })
}

const controllerUpdate = (req, res) => {
    const data_member = {
        id: req.body.id,
        address: req.body.address,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        photo: req.body.photo
    }

    update(data_member, (err, result) => {
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
                data: result,
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

const controllerLogin = (req, res) => {
    const body = req.body

    serviceGetUserByEmail(body.email, (err, results) => {
        if (err) {
            console.log(err)
        } if (!results) {
            return res.json({
                success: 0,
                message: "Invalid email"
            })
        }
        const result = compareSync(body.password, results.password)
        console.log(result)
        console.log(results.password)
        console.log(body.password)

        if (result) {
            results.password = undefined
            const jsonwebtoken = sign({ result: results }, "secretkey", {
                expiresIn: "1h"
            })
            return res.json({
                success: 1,
                message: "Login succesfuly, Your Acount Already Use",
                account: results,
                token: jsonwebtoken
            })
        } else {
            return res.json({
                success: 0,
                message: "Password invalid"
            })
        }
    })
}

module.exports = {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete,
    controllerLogin
}