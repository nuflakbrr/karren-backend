const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { add, get, getId, update, del, serviceGetUserByEmail } = require("./petugas.service")

const controllerAdd = (req, res) => {
    data_user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    }

    const salt = genSaltSync(10)
    data_user.password = hashSync(data_user.password, salt)

    add(data_user, (err, result) => {
        if (!err) {
            // if success
            return res.json({
                success: 1,
                data: result
            })
        } else {
            // if error
            console.log(err)
            return
        }
    })
}

const controllerGet = (req, res) => {
    get((err, result) => {
        if (!err) {
            // if success
            return res.json({
                success: 1,
                data: result
            })
        } else {
            // if error
            console.log(err)
            return
        }
    })
}

const controllerGetId = (req, res) => {
    const body = req.params.id

    getId(body, (err, result) => {
        if (!err) {
            // if success
            return res.json({
                success: 1,
                data: result
            })
        } else {
            // if error
            console.log(err)
            return
        }
    })
}

const controllerUpdate = (req, res) => {
    const data_user = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        // password: req.body.password,
        role: req.body.role,
        photo: req.body.photo
    }

    update(data_user, (err, result) => {
        if (!err) {
            // if success
            return res.json({
                success: 1,
                data: result
            })
        } else if (!result) {
            // if data not found
            return res.json({
                success: 0,
                message: "Data Not Found"
            })
        } else {
            // if error
            console.log(err)
            return
        }
    })
}

const controllerDelete = (req, res) => {
    const body = req.body.id

    del(body, (err, result) => {
        if (!err) {
            // if success
            return res.json({
                success: 1,
                message: "Data Deleted"
            })
        } else if (!result) {
            // if data not found
            return res.json({
                success: 0,
                message: "Data Not Found"
            })
        } else {
            // if error
            console.log(err)
            return
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
                message: "Login succesfuly, Welcome Back!",
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