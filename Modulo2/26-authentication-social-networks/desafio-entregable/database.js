const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()

const connect = async () => {
    // await mongoose.connect(process.env.MONGO_URL_USERS)
    await mongoose.connect("mongodb://localhost:27017/plataforma")
}

module.exports = {connect}