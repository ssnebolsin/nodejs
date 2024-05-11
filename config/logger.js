
const levels = [
    'Emergency',
    'Alert',
    'Critical',
    'Error',  // prod
    'Warning',
    'Notice',  // dev
    'Informational',
    'Debug'   // local
]

const availableLevel = {
    Critical: "Critical",
    Warning: "Warning",
    Debug: "Debug"
}



const logger = (level, arg) => {

    const env = process.env['APP_ENV']

    if (!levels.includes(level))
        throw new Error('invalid log level')

    if (env === 'prod' && levels.indexOf(level) > 3)
        return

    if (env === 'dev' && levels.indexOf(level) > 5)
        return

    console.log(`Log level: ${level}, message: ${arg}, filename: ${getFileNameFromStackTrace(arg)}`)
}

const criticalLog = (msg) => {
    logger(availableLevel.Critical, msg)
}

const warningLog = (msg) => {
    logger(availableLevel.Warning, msg)
}

const debugLog = (msg) => {
    logger(availableLevel.Debug, msg)
}

module.exports = {
    criticalLog,
    warningLog,
    debugLog
}

function getFileNameFromStackTrace(error) {
    if (error && error.stack) {
        const stackLines = error.stack.split('\n');
        const filePathArray = stackLines[1].split("\\");
        // get last item from path array
        return filePathArray.slice(-1)[0];
    }
    return 'No error stack'; // If no stack
}
