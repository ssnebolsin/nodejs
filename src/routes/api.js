const { Router } = require('express')
const { getUsers, createUser, getFakeUsers, login, dashboard, path, refreshTokenAUsingTokenB } = require("../controllers/api");
const { apiAuthA, apiAuthB } = require('../middleware/api-auth');

const apiRouter = new Router()


apiRouter.get('/', getUsers)
apiRouter.get('/fake-users', getFakeUsers)
// apiRouter.post('/', userValidator, createUser)

apiRouter.post('/login', login)
apiRouter.get('/dashboard', apiAuthA, dashboard)
apiRouter.get('/path', apiAuthA, path)
apiRouter.post('/refresh-token', refreshTokenAUsingTokenB)

module.exports = apiRouter