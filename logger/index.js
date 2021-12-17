const devLogger = require('./devLogger')
const prodLogger = require('./prodLogger')

let logger = null;

if (process.env.NODE_ENV === "dev") {
    logger = devLogger()
}

if (process.env.NODE_ENV === "prod") {
    logger = prodLogger()
}

logger.info('Server Starting in ' + process.env.NODE_ENV + ' Logging Mode',)
module.exports = logger;