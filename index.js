const express = require("express")
require("dotenv").config()

const app = express()
const petugasRouter = require("./api/admin/petugas.router")
const mobilRouter = require("./api/car/mobil.router")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to KARREN API 🔥",
        endpoints: [{
            admin: [{
                getAllData: "/api/petugas/",
                getDataById: "/api/petugas/id",
                addData: "/api/petugas/",
                updateData: "/api/petugas/",
                deleteData: "/api/petugas/",
                login: "/api/petugas/login"
            }],
            member: [{
                message: "under construction🚧"
            }],
            cars: [{
                message: "under construction🚧"
            }],
            transactions: [{
                message: "under construction🚧"
            }]
        }]
    })
})

app.use("/api/petugas", petugasRouter)
// app.use("/api/mobil", mobilRouter)

// Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running http://localhost:${port}/api`)
})