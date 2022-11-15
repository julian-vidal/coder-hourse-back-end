const yargs = require("yargs")

const args = yargs(process.argv.slice(2)) 
    .alias({
        m: "mode",
        p: "port",
        d: "debug"
    })
    .default({
        mode: "prod",
        port: 0,
        debug: false
    })

args.others = args._
delete args._
console.log(args.argv)