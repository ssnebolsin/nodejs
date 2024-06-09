const fs = require('node:fs');
const path = require('node:path')
const pug = require('pug')
const { fakeUsers } = require('../services/user')

function index(req, res) {

    let word = ''
    // if (req.session.views) {
    //     req.session.views++

    //     word = `You viewed ${req.session.views} times`
    // } else {
    //     req.session.views = 1
    //     word = 'Welcome'
    // }

    res.render('index', {
        isAuth: false,
        word
    })

    // fakeUsers().then((result)=>{res.send(result)})


    // const pugFile200 = pug.renderFile(
    //     path.join(__dirname, '../html/templates/index.pug'),
    //     {
    //     }
    // )

// return pugFile200
    
}

function users(req, res) {
    res.render('users.pug', {
        users: fakeUsers()
    })
}

function create(req, res) {

    res.send("Created")
}


module.exports = {
    index,
    create,
    users
}