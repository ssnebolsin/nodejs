const { Router } = require('express')
const fs = require('node:fs')
const path = require('node:path')
const pug = require('pug')

const router = new Router()

router.get('/', (req, res)=>{

    const filepath = path.join(__dirname, '../html/index.html')
    const index = fs.readFileSync(filepath)

    function getRandomCode(){
        return Math.random() < 0.1 ? 500 : 200;
    }

    const randTimeout = (Math.floor(Math.random() * 3) + 1) * 1000;
    const randCode = getRandomCode()

    const obj = {
        "random Timeout": randTimeout,
        "random Code": randCode
    }

    function response() {
        if(randCode === 200){
            // return JSON.stringify(obj)
            return index.toString('utf-8')
        } else {
            return '500 Internal Server Error'
        }
    }

    setTimeout(() => {
        // res.set('Content-Type', 'Application/json');
        res.status(randCode).send(response())
    }, randTimeout);

}
)

module.exports = router