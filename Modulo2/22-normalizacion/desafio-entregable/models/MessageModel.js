const dotenv = require("dotenv")
const MessageDaoFirebase = require("../dao/MessageDaoFirebase");

dotenv.config()

const MODE = process.env.MODE

let MessageDao;

switch(MODE) {
    case "MONGO":
        break;
    default:
        MessageDao = MessageDaoFirebase
}


const getAllMessages = () => {
    return MessageDao.getAllMessages()
}


module.exports = {
    getAllMessages
}