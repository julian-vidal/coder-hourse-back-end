const winston = require("winston")

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            level: "warn",
            filename: "warn.log"
        }),
        new winston.transports.File({
            level: "error",
            filename: "error.log"
        }),
        new winston.transports.Console({level: "info"})
    ]
})

module.exports = {
    logger
}