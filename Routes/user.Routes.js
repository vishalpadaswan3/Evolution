const express = require("express")
const bcrypt = require("bcrypt")
const { userSchema } = require("../model/user.model.js")
const jwt = require("jsonwebtoken")

const fast = express.Router()


fast.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city } = req.body
    try {
        const s = await userSchema.find({ email })

        if (s.length === 0) {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send(err.message)
                } else {
                    let user = new userSchema({ name, email, gender, password: hash, age, city })
                    await user.save()
                    res.send({ "msg": "Registered Successfully" })
                }
            });
        } else {
            res.send({ "msg": "User already exist, please login" })
        }

    } catch (error) {
        res.send({ "msg": "Check Again", "error": error.message })
    }
})


fast.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userSchema.find({ email })

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userid: user[0]._id }, "masai")
                    res.send({ "msg": "Login Successfully", "token": token ,user})
                } else {
                    res.send({ "msg": "Check Password" })
                }
            });

        } else {
            res.send({ "msg": "Wrong credentials" })
        }
    } catch (error) {
        res.send({ "msg": "Check Again", "error": error.message })
    }
})


module.exports = {
    fast
}