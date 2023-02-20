const mongoose = require("mongoose")


const Postmodel = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_if_comments: Number,
    user: String
})

const postSchema = mongoose.model("newpost", Postmodel)


module.exports = {
    postSchema
}