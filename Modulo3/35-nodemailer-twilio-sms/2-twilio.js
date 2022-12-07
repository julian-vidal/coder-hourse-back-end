require("dotenv").config()
const twilio = require("twilio")

const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, MY_NUMBER} = process.env


const client = twilio(TWILIO_SID, TWILIO_TOKEN)

const smsOptions = {
    from: TWILIO_NUMBER,
    to: MY_NUMBER,
    body: "Hola desde Twilio & Node JS"
}

const sendSMS = async () => {
    try {
        const res = await client.messages.create(smsOptions)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

sendSMS()