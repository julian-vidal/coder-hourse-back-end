const log4js = require("log4js")

log4js.configure({
    appenders: {
        console: {type: "console"},
        errorFile: { type: "file", filename: "error.log" },
        debugFile: { type: "file", filename: "debug.log" },
    }, 
    categories: {
        default: {
            appenders: ["console"],
            level: "info"
        },
        productionLogger : {
            appenders: ["debugFile", "errorFile"],
            level: "debug"
        },
        debug: {
            appenders: ["debugFile"],
            level: "debug"
        },
        error: {
            appenders: ["errorFile"],
            level: "error"
        }
    }
})