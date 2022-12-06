const isLoggedOut = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}