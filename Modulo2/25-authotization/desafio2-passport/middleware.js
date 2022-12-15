

const isLoggedOut = function (req,res,next) {
    if(!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}

const isLoggedIn = function (req,res,next) {
    if(req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}


module.exports = {
    isLoggedIn,
    isLoggedOut
}