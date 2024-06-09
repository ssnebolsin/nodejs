const { getUserByUsernameAndPassword, getUserById } = require('../services/user')

function getLogin(req, res) {

    if (req.session['userId']) {
        return res.redirect('/dashboard')
    }

    res.render('login')
}

async function postLogin(req, res) {
    const { username, password } = req.body

    console.log({ username, password })

    const user = await getUserByUsernameAndPassword(username, password)

    if (user !== null) {
        req.session.userId = user['_id'].toString()
        res.redirect('/dashboard')
    } else {
        res.redirect('/login')
    }
}

async function dashboard(req, res) {

    const user = await getUserById(req.session.userId)

    res.render('dashboard', {
        name: user.name
    })
}

async function logout(req, res) {
    req.session.destroy()

    res.redirect('/login')
}


module.exports = {
    getLogin,
    postLogin,
    dashboard,
    logout
}