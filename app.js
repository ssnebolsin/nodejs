const express = require("express")
const router = require("./src/routes")
const path = require('node:path')

// for (let i = 0; i < 10; i++) {

//     setTimeout(() => {
//         console.log(i)
//     }, i * 100)
// }

// require('./src/http')()
// require('./src/express')()

const app = express()

// app.use('view engine', 'pug')
// app.use('views', path.join(__dirname, 'src/html/templates/'))
app.use(router)


app.listen(8080, () => {
    console.log(`APP is running on port 8080`)
})