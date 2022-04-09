const express = require("express")
require("dotenv").config()

const app = express()
const petugasRouter = require("./api/admin/petugas.router")
const memberRouter = require("./api/member/member.router")
const mobilRouter = require("./api/car/mobil.router")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
                getDataById: "/api/member/id",
                addData: "/api/member/",
                updateData: "/api/member/",
                deleteData: "/api/member/",
                login: "/api/member/login",
                status: "⚠️ not tested yet"
            }],
            cars: [{
                getAllData: "/api/mobil/",
                getDataById: "/api/mobil/id",
                addData: "/api/mobil/",
                updateData: "/api/mobil/",
                deleteData: "/api/mobil/",
                status: "⚠️ not tested yet"
            }],
            transactions: [{
                getAllData: "/api/mobil/",
                getDataById: "/api/mobil/id",
                addData: "/api/mobil/",
                updateData: "/api/mobil/",
                deleteData: "/api/mobil/",
                status: "⚠️ not tested yet"
            }]
        }]
    })
})

app.use("/api/petugas", petugasRouter)
app.use("/api/member", memberRouter)
app.use("/api/mobil", mobilRouter)

// Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running http://localhost:${port}/api`)
})