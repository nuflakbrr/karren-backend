const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const petugasRouter = require("./api/admin/petugas.router")
const memberRouter = require("./api/member/member.router")
const mobilRouter = require("./api/car/mobil.router")
const transaksiRouter = require("./api/transaction/transaksi.router")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to KARREN API 🔥",
        endpoints: [{
            admin: [{
                getAllData: "/api/petugas/",
                getDataById: "/api/petugas/:id",
                addData: "/api/petugas/",
                updateData: "/api/petugas/",
                deleteData: "/api/petugas/",
                login: "/api/petugas/login",
                status: 200
            }],
            member: [{
                getAllData: "/api/member/",
                getDataById: "/api/member/:id",
                addData: "/api/member/",
                updateData: "/api/member/",
                deleteData: "/api/member/",
                login: "/api/member/login",
                status: 200
            }],
            cars: [{
                getAllData: "/api/mobil/",
                getDataById: "/api/mobil/:id",
                addData: "/api/mobil/",
                updateData: "/api/mobil/",
                deleteData: "/api/mobil/",
                status: 200
            }],
            transactions: [{
                getAllData: "/api/transaksi/",
                getDataById: "/api/transaksi/id",
                addData: "/api/transaksi/",
                updateData: "/api/transaksi/",
                deleteData: "/api/transaksi/",
                status: "⚠️ not tested yet"
            }]
        }]
    })
})

app.use("/api/petugas", petugasRouter)
app.use("/api/member", memberRouter)
app.use("/api/mobil", mobilRouter)
app.use("/api/transaksi", transaksiRouter)

// Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running http://localhost:${port}/api 🚀`)
})