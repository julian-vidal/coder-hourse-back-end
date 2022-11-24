const express = require("express")
const app = express()
const crypto = require("crypto")
const PORT = process.argv[2] || "8080"
const users = {}

const iterations = 10000
const keylen = 500
const digest = "sha512"


// Create user
app.get("/user", (req,res) => {
    const {user, password} = req.query
    if (!user || !password || users[user]){
        return res.sendStatus(400)   
    }

    const salt = crypto.randomBytes(128).toString("base64")
    const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    users[user] = {
        salt,
        hash: hash.toString(),
        user
    }

    res.status(200).json(users[user])
})


// Blocking login (sync)
app.get("/auth_block", (req, res) => {
    const {user, password} = req.query;
    if(!user || !password || users[user] ){
        return res.sendStatus(400)
    }

    const {salt, hash} = users[user]
    const verifyHash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)

    if(hash.toString() === verifyHash.toString()){
        return res.status(200).send({message: "Logged in"})
    }

    return res.status(401).send({message: "Unathorized"})
})


// Non-blocking login (async)
app.get(".auth_no_block", (req,res) => {
    const {user, password} = req.query;
    if(!user || !password || users[user] ){
        return res.sendStatus(400)
    }

    const {salt, hash} = users[user]
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, verifyHash) => {
        if(hash.toString() === verifyHash.toString()){
            return res.status(200).send({message: "Logged in"})
        }
        return res.status(401).send({message: "Unathorized"})
    })
})


app.listen(PORT, () => {
    console.log(`PID: ${process.pid}. Servidor express escuchando en puerto ${PORT}`);
});