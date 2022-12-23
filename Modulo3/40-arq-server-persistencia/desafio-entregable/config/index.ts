require("dotenv").config()
import yargs from "yargs/yargs"


export const {MONGO_URI} = process.env
export const {SECRET} = process.env

const argv = yargs(process.argv.slice(2)).options({
    p: {type: "number", default: 8080, alias: "PORT"},
    m: {type: "string", default: "FORK", alias: "MODE"},
    db: {type: "string", default: "MONGO", alias: "DATABASE"}
}).parseSync()

export const {PORT, MODE, DATABASE} = argv