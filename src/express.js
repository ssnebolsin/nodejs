const express = require("express")

module.exports = () => {

    const app = express()

    function getRandomCode(){

        return Math.random() < 0.1 ? 500 : 200;

    }

    app.get('/', (req, res)=>{

        const randTimeout = (Math.floor(Math.random() * 3) + 1) * 1000;
        const randCode = getRandomCode()

        const obj = {
            "random Timeout": randTimeout,
            "random Code": randCode
        }

        function response() {
            if(randCode === 200){
                return JSON.stringify(obj)
            } else {
                return '500 Internal Server Error'
            }
        }

        setTimeout(() => {
            res.set('Content-Type', 'Application/json');
            res.status(randCode).send(response())
        }, randTimeout);

    }
)

app.listen(8080, () => {
    console.log(`APP is running on port 8080`)
})

}

