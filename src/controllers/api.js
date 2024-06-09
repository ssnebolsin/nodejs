const { getUsers: getUsersService, fakeUsers, createUser: createUserService, getUserByUsernameAndPassword, getUserById } = require("../services/user")

const jwt = require('jsonwebtoken')

const JWT_SECRET = "qwerty"
const JWT_REFRESH = "12333333"

function getUsers(req, res) {
    res.json(getUsersService())
}

async function getFakeUsers(req, res) {
    res.json(await fakeUsers())
}

function createUser(req, res) {

    createUserService(req.body)

    res.send("Created")
}

async function login(req, res) {

    const { username, password } = req.body

    const user = await getUserByUsernameAndPassword(username, password)

    if (user !== null) {

        const paylaod = {
            userId: user._id.toString(),
            permissions: ['user', 'manager']
        }

        const BearerTokenA = jwt.sign(paylaod, JWT_SECRET, {
            expiresIn: 60
        })

        const RefreshTokenB = jwt.sign(paylaod, JWT_SECRET, {
            expiresIn: 60
        })

        return res.json({
            status: "OK",
            token: jwt.sign(paylaod, JWT_SECRET, {
                expiresIn: 60
            }),
            refresh: jwt.sign(paylaod, JWT_REFRESH, {
                expiresIn: 60
            }),
        })
    } else {
        return res.status(401).json({ status: "FAILED" })
    }

    console.log({ user })

    return res.json({ status: "OK" })
}


function dashboard(req, res) {

    return res.json({ status: "auth is success" })
}




module.exports = {
    getUsers,
    createUser,
    getFakeUsers,
    login,
    dashboard,
    JWT_SECRET
}