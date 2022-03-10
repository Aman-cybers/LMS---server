const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/student.model')
const jwt = require('jsonwebtoken')
const UserF = require('./models/faculty.model')
const Task = require('./models/taskmodel')

app.use(cors())
app.use(express.json())
//mongodb+srv://aman:aman@sandbox.ke1tn.mongodb.net/UserDataStudentData?retryWrites=true&w=majority&ssl=true
mongoose.connect('mongodb://aman:aman@sandbox-shard-00-00.ke1tn.mongodb.net:27017,sandbox-shard-00-01.ke1tn.mongodb.net:27017,sandbox-shard-00-02.ke1tn.mongodb.net:27017/UserDataStudentData?ssl=true&replicaSet=atlas-b6oaf4-shard-0&authSource=admin&retryWrites=true&w=majority')








app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        res.json({ status: 'ok' })
        console.log(user)
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

// app.post('/api/login', async (req, res) => {
//     console.log(req.body)
//     const user = await User.findOne({
//         email: req.body.email,
//         password: req.body.password

//     })

//     if (user) {
//         res.send({ message: 'ok', user: user })

//     } else {
//         res.send({ message: 'user not registered' })
//     }

// })

app.post('/api/login/F', async (req, res) => {
    console.log(req.body)
    const user = await UserF.findOne({
        email: req.body.email,
        password: req.body.password

    })
    console.log(user)
    if (user) {
        const token = jwt.sign({
            email: req.body.email,
            name: req.body.name
        }, 'secret123')
        return res.json({ status: 'ok', user: token })
    } else {
        console.log(user)
        return res.json({ status: 'error', user: false })

    }

})
app.get('/api/view/logdataS', async (req, res) => {
    const username = await User.find()
    const newData = JSON.stringify(username)

    res.json(newData)


})
app.post('/api/register/faculty', async (req, res) => {
    console.log(req.body)
    try {
        const user = await UserF.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        res.json({ status: 'ok', user: user })
        console.log(user)
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})



app.listen(1337, () => {
    console.log('server started 1337!')
})