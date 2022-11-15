const dotenv = require("dotenv")

dotenv.config({
    path:
        process.env.MODE == "prod"
        ? __dirname + "/.env"
        : __dirname + "/dev.env"
})

const config = {
    MODE: process.env.MODE,
    PORT: process.env.PORT,
    DEBUG: process.env.DEBUG
}

module.exports = config