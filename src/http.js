const { get, createServer } = require('node:http')

module.exports = ()=> {

    const port = process.env.APP_PORT || 8080

    function getRandomCode(){

        return Math.random() < 0.1 ? 500 : 200;

    }

    function requestHandler(req, res) {

        const randTimeout = (Math.floor(Math.random() * 3) + 1) * 1000;
        const randCode = getRandomCode()

        const obj = {
            "random Timeout": randTimeout,
            "random Code": randCode
        }

        res.setHeader("Content-Type", "Application/json")
        res.writeHead(randCode)

        function response() {
            if(randCode === 200){
                res.write(JSON.stringify(obj))
                res.end()
            } else {
                res.write('500 Internal Server Error')
                res.end()
            }
        }

        setTimeout(() => {
            response()
        }, randTimeout);

    }

    const server = createServer(requestHandler)

    server.listen(port)

    server.on('listening', () => {
        console.log(`Server is running on port: ${port}`)
    })

}