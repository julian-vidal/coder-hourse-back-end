const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../config")

const isAuth = (req,res,next) => {
    const {headers} = req
    if(!headers.authorization){
        res.status(401).json({
            message: "Token is missing"
        })
        return
    }

    const token = headers.authorization.replace("Bearer ","")

    try {
        const verified = jwt.verify(token, JWT_KEY)
    } catch (error) {
        res.status(400).json({
            message: "Invalid token"
        })
    }
    
    next()
}

module.exports = {
    isAuth
}