<<<<<<< HEAD
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/student.model')
const jwt = require('jsonwebtoken')
const UserF = require('./models/faculty.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://aman:aman@sandbox.ke1tn.mongodb.net/UserDataStudentData?retryWrites=true&w=majority')

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

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({
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


app.get('/logdata', async (req, res) => {
    User.find()
        .then(ressult => {
            const lofgs = res.json({
                logdata: ressult
            })

        }).catch(err => {
            console.log(err)
        })


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
        res.json({ status: 'ok' })
        console.log(user)
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.listen(1337, () => {
    console.log('server started 1337!')
=======
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/student.model')
const jwt = require('jsonwebtoken')
const UserF = require('./models/faculty.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://aman:aman@sandbox.ke1tn.mongodb.net/UserDataStudentData?retryWrites=true&w=majority')

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

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({
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


app.get('/logdata', async (req, res) => {
    User.find()
        .then(ressult => {
            const lofgs = res.json({
                logdata: ressult
            })

        }).catch(err => {
            console.log(err)
        })


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
        res.json({ status: 'ok' })
        console.log(user)
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.listen(1337, () => {
    console.log('server started 1337!')
>>>>>>> c5fd161a7129b515c2ddbc5980bae2d04ce9b434
})