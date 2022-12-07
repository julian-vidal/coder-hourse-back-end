require("dotenv").config()
const nodemailer = require("nodemailer")

const {REMOTE_HOST, REMOTE_PORT, REMOTE_USER, REMOTE_PASSWORD} = process.env
const {ETHEREAL_HOST, ETHEREAL_PORT, ETHEREAL_USER, ETHEREAL_PASSWORD} = process.env

const argv = process.argv.slice(2)
const to = argv[0] || "juliantest@yopmail.com"
const subject = argv[1] || "Test"
const html = argv[2] || "<h1>Hello</h1><p>This is the default message.</p>"
const attachment = argv[3] || false
const emailMethod = argv[4] || "TEST"

let host, port, user, pass


if(emailMethod === "REMOTE") {
    [host, port, user, pass] = [REMOTE_HOST, REMOTE_PORT, REMOTE_USER, REMOTE_PASSWORD];
} else {
    [host, port, user, pass] = [ETHEREAL_HOST, ETHEREAL_PORT, ETHEREAL_USER, ETHEREAL_PASSWORD];
}

const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass,
    }
});


let mailOptions

if (attachment === true ){
    mailOptions = {
        to,
        from: user,
        subject,
        html,
        attachments: [
            {
                path: "./imagen.png"
            }
        ]
    }
    
} else {
    mailOptions = {
        to,
        from: user,
        subject,
        html
    }
}

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error);
    }
}

sendEmail()



// node 1-nodemailer.js julian.vidal123@gmail.com HolaMundo "<h2>Hello BB<h2>" false REMOTE

// node 1-nodemailer.js <RECIPIENT> <SUBJECT_LINE> "<HTML_BODY> <ATTACHMENT> <EMAIL_METHOD>" 