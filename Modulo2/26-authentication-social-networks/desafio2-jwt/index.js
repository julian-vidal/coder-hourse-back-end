const express = require("express")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const validateJWT = require("./middleware")

const PORT = 8000
const app = express()

const {SECRET} = process.env

const users = [
    {email: "user1@test.com", password: "user1"}
]

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.post("/login", (req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res
                .status(400)
                .send("Email or password are blank")
    }

    const user = users.find(user => user.email === email);

    if(!user || user?.password !== password) {
        res.status(401).send("Invalid ")
    }

    const token = jwt.sign({
        data: {
            email: user.email,
            typeUser: "admin"
        }
    }, SECRET,
    {expiresIn: "1d"})

    res.send({
        user: {
            email: user.email,
            typeUser: "admin"
        },
        token
    })
})


app.get("/", validateJWT, (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})