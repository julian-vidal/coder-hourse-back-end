const pino = require("pino")

const loggerProd = pino({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:mm-dd-yyyy HH:mm:ss",
            ignore: "hostname,pid"
        }
    }
})

module.exports = {
    loggerProd
}