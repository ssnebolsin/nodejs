const express = require("express")
const bodyParser = require('body-parser')
const router = require("./src/routes")
const path = require('node:path')
const cookies = require('cookie-parser')
const session = require('express-session')

// require('./src/http')()
// require('./src/express')()

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/html/templates'))
// app.use(router)


app.use(cookies())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(express.static('public'))
app.use(router)


app.listen(8080, () => {
    console.log(`APP is running on port 8080`)
})