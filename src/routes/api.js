const { Router } = require('express')
const { getUsers, createUser, getFakeUsers, login, dashboard, path, refreshTokenAUsingTokenB } = require("../controllers/api");
const { userValidator } = require("../validators/user");
const { apiAuth } = require('../middleware/api-auth');

const apiRouter = new Router()


apiRouter.get('/', getUsers)
apiRouter.get('/fake-users', getFakeUsers)
apiRouter.post('/create-user', userValidator, createUser)

apiRouter.post('/login', login)
apiRouter.get('/dashboard', apiAuth, dashboard)
apiRouter.get('/path', apiAuth, path)
apiRouter.post('/refresh-token', refreshTokenAUsingTokenB)

module.exports = apiRouter