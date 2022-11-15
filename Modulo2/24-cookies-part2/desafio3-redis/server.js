const express = require("express");
const session = require("express-session");
const redis = require("redis");
const client = redis.createClient({
    legacyMode: true,
    url: 'redis://default:6qc7KBDXUF4Om6rZAWs2gPEg36Vb7Tdj@redis-10073.c8.us-east-1-3.ec2.cloud.redislabs.com:10073' // if this isn't included, it'll connect to localhost redis://<username>:<password>@<host>:<port>
})

client.connect().catch(console.log)
const RedisStore = require("connect-redis")(session)

const app = express();


app.use(session({
    store: new RedisStore({
        client,
        ttl:60,
        retries: 0
    }),
    secret:"9!l1&ZKFr304",
    resave: false,
    saveUninitialized: true
}))

app.get("/", (req,res) => {
    
    req.session.name = req.query.name || ""
    const {name} = req.session
    if(req.session.visitas){
        req.session.visitas++
        res.send(`Welcome back ${name}, you've visited this site ${req.session.visitas} times`)
    } else {
        req.session.visitas = 1;
        res.send(`Welcome ${name}, it's your first visit`)
    }

})

app.get("/logout", (req,res) => {
    req.session.destroy(err => {
        if(err) {
            res.send("Erro to logout")
        } else {
            res.send("Logged out succesfully")
        }
    })
})

app.listen(8000, (req,res) => {
    console.log(`Server is listening at port 8000`)
})