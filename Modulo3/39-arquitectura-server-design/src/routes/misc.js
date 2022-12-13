const {Router} = require("express")

const {generateToken } = require("../controllers/misc")
const miscRouter = Router()

miscRouter.get("/generateToken", generateToken)

module.exports = miscRouter