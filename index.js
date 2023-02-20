const express = require("express")
const {connection} = require("./config/db.js")
const dotenv = require("dotenv").config()
const cors = require("cors")
const {fast} = require("./Routes/user.Routes.js")
const {sendPost} = require("./Routes/post.Routes")


const app = express()
app.use(cors())
app.use(express.json())
app.use(fast)
app.use(sendPost)
app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("error")
    }
    console.log(process.env.port + "  Running")
})