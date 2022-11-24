require("dotenv").config()
const twilio = require("twilio")

const {TWILIO_SID, TWILIO_TOKEN} = process.env


const client = twilio(TWILIO_SID, TWILIO_TOKEN)

const smsOptions = {
    
}