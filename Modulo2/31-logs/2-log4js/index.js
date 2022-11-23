// dotenv
const dotenv = require("dotenv")
dotenv.config()
const {NODE_ENV} = process.env || "development"


// Log4js


const log4js = require("log4js")
require("./logger_config")
const logger = NODE_ENV === "production" ? log4js.getLogger("productionLogger") : log4js.getLogger()

/*
logger.trace("Message trace")
logger.debug("Message debug")
logger.warn("Message warn")
logger.error("Message error")
logger.fatal("Message fatal")
*/

// Express setup
const express = require("express")
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server in ${NODE_ENV} mode is listening at port ${PORT}`);
})

server.on("error", err => {
    logger.error(`Something went wrong: ${err}`)
})

// Routes
app.get("/sumar", (req,res) => {
    let {num1, num2} = req.query
    if([num1,num2].some(num => isNaN(num))){
        const msg = `Invalud input: num1=${num1}, num2=${num2}`
        logger.error(msg)
        return res.send(msg)
    }
    return res.send(`${num1} + ${num2} = ${Number(num1)+ Number(num2)}`)
})

app.get("*", (req,res) => {
    const msg = `Route not found ${req.url}`
    logger.warn(msg)
    res.status(404).send(msg)
    return
})



