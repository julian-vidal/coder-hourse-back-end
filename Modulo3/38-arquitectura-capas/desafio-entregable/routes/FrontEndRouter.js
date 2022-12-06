const {Router} = require("express")
const compression = require("compression")
const gzipMiddleware = compression()
const {isLoggedIn, isLoggedOut } = require("../middleware")
const passport = require("passport");
require("../utils/passport")



const {index, getSignup, getLogin, getError, getLogout, getApiRandoms,getInfoDebug, getInfoNoDebug, get404, redirectIndex} = require("../controllers/FrontEndController")
const routerFrontend = Router()


// GET requests 
routerFrontend.get("/", [gzipMiddleware,isLoggedOut], index )
routerFrontend.get("/signup", [gzipMiddleware,isLoggedIn], getSignup )
routerFrontend.get("/login", [gzipMiddleware,isLoggedIn], getLogin )
routerFrontend.get("/error", gzipMiddleware, getError )
routerFrontend.get("/logout", gzipMiddleware, getLogout )
routerFrontend.get("/api/randoms", gzipMiddleware, getApiRandoms )
routerFrontend.get("/info-debug", gzipMiddleware, getInfoDebug )
routerFrontend.get("/info-nodebug", gzipMiddleware, getInfoNoDebug )
routerFrontend.get("*", gzipMiddleware, get404 )

// POST requests
routerFrontend.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/error",
    failureMessage: "User already exists!!!",
    usernameField: "email",
    passwordField: "password"
}), redirectIndex )


routerFrontend.post("/login", passport.authenticate("login", {
    failureRedirect: "/error",
    failureMessage: "Invalid username or password",
    usernameField: "email",
    passwordField: "password"
}), redirectIndex )

module.exports = routerFrontend