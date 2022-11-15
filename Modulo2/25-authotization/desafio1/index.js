/* ==========================================
Server Setup
========================================== */
const express = require("express");
const PORT = 8080;

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const usersWithPasswords = [
    { username: 'user1', password: 'password1', address: 'address1' },
    { username: 'user2', password: 'password2', address: 'address2' },
    { username: 'user3', password: 'password3', address: 'address3' }
]


/* ==========================================
Session setup
========================================== */
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ttl = 60 * 60 * 24; // 1 day in seconds
const retries = 0;

app.use(session({
    store: new MongoStore({
        mongoUrl: "mongodb://127.0.0.1:27017/sessions",
        ttl,
        retries
    }),
    secret: "aKiS8mt3zF5nLQUbtav4",
    resave: false,
    saveUninitialized: true
}))

/* ==========================================
EJS
========================================== */
app.set("view engine", "ejs");
app.set("views", "./views/pages/")

/* ==========================================
Middleware
========================================== */
const {isLoggedIn, isLoggedOut} = require("./middleware")

/* ==========================================
Routes
========================================== */

app.get("/", (req,res) => {
    res.redirect("/profile");
})

// Profile route

app.get("/profile", isLoggedOut, (req,res) => {
    if(!req.session.counter) {
        req.session.counter = 1
    } else {
        req.session.counter++
    }
    res.render("profile" , {
        user: req.session.user,
        counter: req.session.counter
    })
})

// Signup route

app.post("/signup", (req,res) => {
    const {username, password, address} = req.body

    // Check if the user exists
    const user = usersWithPasswords.find(user => user.username === username)
    if(user) {
        return res
            .status(400)
            .json({"error": "user already exists"})
        
    }
    usersWithPasswords.push({username, password, address})
    console.log(usersWithPasswords)
    res.send({
        message: "User created succesfully",
        user: {username, address}
    })
})

app.get("/signup", isLoggedIn, (req,res) => {
    res.render("signup")
})

// Login route
app.post("/login", (req,res) => {
    console.log(req.body)
    const {username, password} = req.body
    const user = usersWithPasswords.find(user => user.username === username);
    if (!user || user.password !== password) {
        return res
            .status(404)
            .json({"error": "Password doesn't match or user doesn't exist"})
    } 
    req.session.user = user
    res.redirect("/profile")
})

app.get("/login", isLoggedIn, (req,res) => {
    res.render("login")
})

// Logout route
app.post("/logout", (req,res) => {
    req.session.destroy()
    res.redirect("/login")
    return
})


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})