
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../controllers/api')


function apiAuth(req, res, next) {


    try {
        const data = jwt.verify(req.headers['authorization'], JWT_SECRET)

        if (data) {
            console.log(data)
            next()
        } else {
            throw new Error('Auth error')
        }

    } catch (err) {
        return res.status(401).json({
            error: err.message
        })
    }
}

module.exports = {
    apiAuth
}