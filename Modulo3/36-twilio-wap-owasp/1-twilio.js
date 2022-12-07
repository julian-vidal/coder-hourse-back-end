require("dotenv").config()
const twilio = require("twilio")

const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, MY_NUMBER, TWILIO_WAP_NUMBER} = process.env


const client = twilio(TWILIO_SID, TWILIO_TOKEN)

const msgOptions = {
    from: `whatsapp:${TWILIO_WAP_NUMBER}`,
    to: `whatsapp:${MY_NUMBER}`,
    body: "Image test",
    mediaUrl: ["https://img2.rtve.es/i/?w=1600&i=1620920852564.jpg"]
}

const sendMessage = async () => {
    try {
        const res = await client.messages.create(msgOptions)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

sendMessage()