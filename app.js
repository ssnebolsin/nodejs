require('dotenv').config()
const dbConfig = require("./config/db")[process.env['APP_ENV']]
const { criticalLog, warningLog, debugLog } = require('./config/logger')

warningLog('warning message')
debugLog('debug message')

try {
    console.log(abc)

} catch (error) {
    criticalLog(error)
}