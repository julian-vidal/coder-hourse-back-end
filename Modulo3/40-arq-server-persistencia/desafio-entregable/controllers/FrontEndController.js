const {fork} = require("child_process")
const os = require("os")

const {logger} = require("../utils/logger_config")
const FrontEndModel = require("../models/FrontEndModel")

// GET requests
const index = async (req,res) => {
    if(!req.session.counter) {
        req.session.counter = 1
    } else {
        req.session.counter++
    }
    
    res.render("index" , {
        user: req.user,
        counter: req.session.counter,
        products: await FrontEndModel.getAllProducts(),
        expirationDate: req.session.cookie.sessionID
    })

    const logMsg = `Route: ${req.url}. Method: ${req.method} `
    logger.log("info", logMsg )
}

const getSignup = (req,res) => {
    res.render("signup")
}

const getLogin = (req,res) => {
    res.render("login")
}


const getError = (req,res) => {
    const {messages} = req.session
    let error
    typeof messages !== "undefined" ? error = messages[messages.length-1] : error = "Something went wrong"
    
    const logMsg = `Route: ${req.url}. Method: ${req.method}. Error: ${error} `
    logger.log("error", logMsg)

    res.render("error",{
        error
    })
}

const getLogout = (req,res) => {
    req.session.destroy()
    
    req.logout(() => {
        res.redirect("/login")
    })
    
}

const getApiRandoms = (req,res) => {
    let cant
    if (typeof req.query.cant != "undefined"){
        cant = parseInt(req.query.cant)
    } else {
        cant = 1e8
    }
    
    const child = fork("./child-random-numbers.js")
    child.send(cant)
    child.on("message", obj => {
        res.json(obj)
    })
}

const getInfoDebug = (req,res) => {
    const output = {
        inputArguments: process.argv.slice(2),
        platform: process.platform,
        nodeVersion: process.version,
        totalReservedMemoryRSS: process.memoryUsage().rss,
        executionPath: process.execPath,
        processID: process.pid,
        projectPath: process.mainModule.path,
        numberOfCPUs: os.cpus().length
    }
    res.json({output})
    console.log(output);
}

const getInfoNoDebug = (req,res) => {
    const output = {
        inputArguments: process.argv.slice(2),
        platform: process.platform,
        nodeVersion: process.version,
        totalReservedMemoryRSS: process.memoryUsage().rss,
        executionPath: process.execPath,
        processID: process.pid,
        projectPath: process.mainModule.path,
        numberOfCPUs: os.cpus().length
    }
    res.json({output})
}


const get404 = (req, res) => {
    const logMsg = `Route: ${req.url}. Method: ${req.method} `
    logger.log("warn", logMsg)
    return res.json({message: "Route isn't defined. 404 error"})
    
}


// POST requests
const redirectIndex = (req,res) => {
    res.redirect("/")
}



module.exports = {
    index,
    getSignup,
    getLogin,
    getError,
    getLogout,
    getApiRandoms,
    getInfoDebug,
    getInfoNoDebug,
    get404,
    redirectIndex
}