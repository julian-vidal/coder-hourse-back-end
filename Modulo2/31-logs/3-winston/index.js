// dotenv
const dotenv = require("dotenv")
dotenv.config()
const {NODE_ENV} = process.env || "development"


// Winston


const {loggerDev, loggerProd} = require("./logger_config")
const logger = NODE_ENV === "production" ? loggerProd : loggerDev

// Express setup
const express = require("express")
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server in ${NODE_ENV} mode is listening at port ${PORT}`);
})

server.on("error", err => {
    logger.log("error", `Something went wrong: ${err}`)
})

// Routes
app.get("/sumar", (req,res) => {
    let {num1, num2} = req.query
    if([num1,num2].some(num => isNaN(num))){
        const msg = `Invalud input: num1=${num1}, num2=${num2}`
        logger.log("error", msg)
        return res.send(msg)
    }
    const msg = `${num1} + ${num2} = ${Number(num1)+ Number(num2)}`
    logger.log("info", msg )
    return res.send(msg)
})

app.get("*", (req,res) => {
    const msg = `Route not found ${req.url}`
    logger.log("warn", msg)
    res.status(404).send(msg)
    return
})



