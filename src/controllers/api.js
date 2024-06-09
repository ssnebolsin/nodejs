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

        const RefreshTokenB = jwt.sign(paylaod, JWT_REFRESH, {
            expiresIn: 120
        })

        return res.json({
            status: "OK",
            token: BearerTokenA,
            refresh: RefreshTokenB
        })
    } else {
        return res.status(401).json({ status: "FAILED" })
    }
}


function dashboard(req, res) {

    return res.json({ status: "auth is success" })
}

function path(req, res) {

    return res.json({ status: "auth is success, Path is available with Token A" })
}

async function refreshTokenAUsingTokenB(req, res) {

        const refreshTokenB = req.body.refreshTokenB;
        

        if (!refreshTokenB) {
            return res.status(401).send('Refresh token is required');
        }

        try {
            const data = jwt.verify(refreshTokenB, JWT_REFRESH)
    
            if (data) {
                const payload = { 
                    userId: data.userId,
                    permissions: data.permissions 
                };
                
                console.log(payload)

                const newBearerTokenA = jwt.sign(payload, JWT_SECRET, {
                    expiresIn: 60
                })
        
                const newRefreshTokenB = jwt.sign(payload, JWT_REFRESH, {
                    expiresIn: 120
                })

                return res.json({
                    status: "OK",
                    token: newBearerTokenA,
                    refresh: newRefreshTokenB
                })

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
    getUsers,
    createUser,
    getFakeUsers,
    login,
    dashboard,
    JWT_SECRET,
    path,
    refreshTokenAUsingTokenB
}