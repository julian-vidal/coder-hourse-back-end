const MessageModel = require("../models/MessageModel");

const getAllMessages = async (req,res) => {
    try {
        const messages = await MessageModel.getAllMessages();
        return res.json(messages)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
    
}

module.exports = {
    getAllMessages
}