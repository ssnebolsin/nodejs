const { Router } = require('express')
const { index, create, users } = require("../controllers")
const { getLogin, postLogin, dashboard, logout } = require("../controllers/auth")
const { webAuth } = require('../middleware/web-auth')

const webRouter = new Router()

webRouter.get('/',  /**  */ index)
webRouter.get('/users',  /**  */ users)
webRouter.post('/', create)


webRouter.get('/login', getLogin)
webRouter.post('/login', postLogin)
webRouter.get('/dashboard', webAuth, dashboard)
webRouter.get('/logout', webAuth, logout)

module.exports = webRouter