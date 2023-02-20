
const mongoose = require("mongoose")

const Usermodel = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String
})

const userSchema = mongoose.model("newuser",Usermodel)


module.exports = {
    userSchema
}