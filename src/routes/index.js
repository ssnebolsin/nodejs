const { Router } = require('express')
const fs = require('node:fs')
const path = require('node:path')
const pug = require('pug')

const router = new Router()

router.get('/', (req, res)=>{

    function getRandomCode(){
        return Math.random() < 0.1 ? 500 : 200;
    }

    const randTimeout = (Math.floor(Math.random() * 3) + 1) * 1000;
    const randCode = getRandomCode()

    const obj = {
        "random Timeout": randTimeout,
        "random Code": randCode
    }

    const pugFile200 = pug.renderFile(
        path.join(__dirname, '../html/templates/index.pug'),
        {
        rTimeOut: randTimeout,
        rCode: randCode
        }
    )

    const pugFile500 = pug.renderFile(
        path.join(__dirname, '../html/templates/error.pug'),
        {
        rTimeOut: randTimeout,
        rCode: randCode
        }
    )

    function response() {
       return randCode === 200 ? pugFile200 : pugFile500
    }

    setTimeout(() => {
        res.status(randCode).send(response())
    }, randTimeout);

}
)

module.exports = router