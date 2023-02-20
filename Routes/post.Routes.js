const express = require("express")
const { authenticate } = require("../Middleware/auth.Middleware.js")
const { postSchema } = require("../model/post.model.js")


const sendPost = express.Router()
sendPost.use(authenticate)


sendPost.get("/posts/:id", async (req, res) => {
    const d = req.params.id
    
    const s = await postSchema.find({user:d})
    res.send(s)
})
sendPost.post("/posts/add", async (req, res) => {

    try {
        const user = new postSchema(req.body)
        await user.save()
        console.log(req.body)
        res.send({ "msg": "Data has been added" })
    } catch (error) {
        res.send({ "msg": "check again", "error": error.message })
    }
})


sendPost.patch("/posts/update/:id", async (req, res) => {
    try {
        const s = req.params.id
        const d = req.body
        const user = await postSchema.findByIdAndUpdate({ _id: s }, d)
        res.send({ "msg": "Data has been Updated" })
    } catch (error) {
        res.send({ "msg": "check again", "error": error.message })
    }
})

sendPost.post("/posts/delete/:id", async (req, res) => {
    try {
        const s = req.params.id
        const user = await postSchema.findByIdAndDelete({ _id: s })
        res.send({ "msg": "Data has been Deleted" })
    } catch (error) {
        res.send({ "msg": "check again", "error": error.message })
    }
})


module.exports = {
    sendPost
}