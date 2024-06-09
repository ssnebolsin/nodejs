
const { getDb } = require("../mongo/client")
const { ObjectId } = require('mongodb');
const crypto = require('node:crypto')


const users = []

function getUsers() {
    return users
}

async function createUser(userObj) {

    const password = crypto.createHash('md5').update(userObj['password']).digest('hex')

    const db = await getDb()
    const collection = db.collection('users');
    const saved = await collection.insertOne({
        username: userObj['name'],
        password: password
    })

    console.log(saved)

    return true
}

async function getUserByUsernameAndPassword(username, password) {

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const db = await getDb()
    const collection = db.collection('users');

    const user = await collection.findOne({
        name: username, 
        password: password 
    })

    // const user = await collection.findOne({
    //     username,
    //     password: hash
    // })
    console.log(user)
    return user
}

async function getUserById(id) {
    const db = await getDb()
    const collection = db.collection('users');

    const user = await collection.findOne({
        _id: new ObjectId(id)
    })

    return user
}

async function fakeUsers() {

    /**
     * @ref{ db: MongoClient}
     */
    const db = await getDb()
    const collection = db.collection('users');
    const curson = await collection.find({})

    const users = []
    // for await (const doc of curson) {
    //     users.push(doc)
    // }

    while (await curson.hasNext()) {
        users.push(await curson.next())
    }

    return users
}

module.exports = {
    getUsers,
    createUser,
    fakeUsers,
    getUserByUsernameAndPassword,
    getUserById
}