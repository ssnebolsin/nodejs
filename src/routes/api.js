const { Router } = require('express')
const { getUsers, createUser, getFakeUsers, login, dashboard } = require("../controllers/api");
const { apiAuth } = require('../middleware/api-auth');

const apiRouter = new Router()


apiRouter.get('/', getUsers)
apiRouter.get('/fake-users', getFakeUsers)
// apiRouter.post('/', userValidator, createUser)

apiRouter.post('/login', login)
apiRouter.get('/dashboard', apiAuth, dashboard)
apiRouter.post('/refresh-token', apiAuth, getNewToken)

module.exports = apiRouter