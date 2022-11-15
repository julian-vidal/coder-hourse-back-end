const express = require("express");
const session = require("express-session");
const FireStore = require("session-file-store")(session);

const app = express();

app.use(session({
    store: new FireStore({
        path: "./sessions",
        ttl:60 * 60 * 24 * 7,
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