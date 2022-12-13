const { JWT_KEY } = require("../config")
const jwt = require("jsonwebtoken")

const generateToken = (req, res) => {
    const token = jwt.sign({user: "testUser"}, JWT_KEY, {expiresIn: "1d"})
    res.json({token})
}

module.exports = {
    generateToken,
}