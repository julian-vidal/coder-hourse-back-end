const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const SECRET = process.env.SECRET

module.exports = function validateJWT(req,res, next) {
    const tokenHeader = req.headers?.authorization

    if (!tokenHeader) {
        return res.status(401).send("Not authorized")
    }

    const token = tokenHeader?.split(" ")[1]

    try {
        const validate = jwt.verify(token, SECRET);
        next();
    } catch (err) {
        return res.status(401).send("Not authorized")
    }
}