const express = require("express");
const session = require("express-session");

const MongoStore = require("connect-mongo")

const app = express();


// mongosh "mongodb+srv://cluster0.fky7pym.mongodb.net/myFirstDatabase" --apiVersion 1 --username julianvidal123




app.use(session({
    store: new MongoStore({
        // mongoUrl: "mongodb://localhost:27017/sessions", //localhost    
        mongoUrl: "mongodb+srv://julianvidal123:egtOJCtxFKwkN74x@cluster0.fky7pym.mongodb.net/sessions", // REMOTE: "mongodb+srv://<user>:<password>@<host>/<dbname>";
        ttl: 60 * 60 * 24 * 7,
        retries: 0
    }),
    secret:"9!l1&ZKFr304",
    resave: false,
    saveUninitialized: true
}))

app.use((req,res,next) => {
    if(req.session.name || !req.session.lastUpdate) {
        req.session.lastUpdate = Date.now()
    }
})

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