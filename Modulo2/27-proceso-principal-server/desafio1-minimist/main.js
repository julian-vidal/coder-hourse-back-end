const parseArgs = require("minimist")

const options = {
    alias: {
        m: "mode",
        p: "port",
        d: "debug"
    }, 
    default: {
        mode: "prod",
        port: 0,
        debug: false
    }
}

const obj = parseArgs(process.argv.slice(2), options)
obj.others = obj._;
delete obj._
console.log(obj)