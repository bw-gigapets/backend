require("dotenv").config()
const express = require("express")
const cors = require("cors")
const server = express()
const authRouter = require("./auth/users")
const foodsRouter = require("./foods/foods")

server.use(cors())
server.use(express.urlencoded({extended:true}))
server.use(express.json())

server.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to the website!"
    })
})

server.use("/api/auth", authRouter)
server.use("/api/foods", foodsRouter)

server.get((error, req, res, next) => {
    console.log("Error: ", error)

    res.status(500).json({
        message: "Internal server error...",
        error
    })
})

const host = process.env.HOST || "http://localhost"
const port = process.env.PORT || 5001

if (!module.parent) {
    server.listen(port, () => {
        console.log(`\n***Server listening at ${host}:${port}***\n`)
    })
}

module.exports = server
