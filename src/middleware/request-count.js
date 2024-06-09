
const crypto = require('node:crypto')
const moment = require('moment')

const requests = new Map()

function countRestiction(req, res, next) {

    const ip = req.ip
    const agent = req.header('User-Agent')

    const hash = crypto.createHash('md5').update(`${ip}${agent}`).digest('hex')

    const userRequests = requests.get(hash) || []
    userRequests.push(moment().toDate())
    requests.set(hash, userRequests)

    if (userRequests.length > 100) {
        return res.status(429).send('To many requests')
    }

    next()
}

setInterval(() => {

    requests.forEach((userRequests, key, map) => {

        map.set(key, userRequests.filter(itm => {
            return moment().diff(itm, 'seconds') < 10
        }))
    })

}, 5000)


module.exports = {
    countRestiction
}