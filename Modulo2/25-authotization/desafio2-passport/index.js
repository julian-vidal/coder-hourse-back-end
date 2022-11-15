/* ==========================================
Server Setup
========================================== */
const express = require("express");
const PORT = 8080;

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})

/* ==========================================
DB Connection
========================================== */
const {connect} = require("./database")
connect()

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
Passport setup
========================================== */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./user.schema");
const {comparePassword, hashPassword} = require("./utils")
const {Types} = require("mongoose")


// Compare if the username and password provided match with a user in the MongoDB
passport.use("login", new LocalStrategy(async(username, password, done) => {
    const user = await User.findOne({username})
    console.log(`user: ${user}`)
    if (!user){
        return done()
    }

    const passHash = user.password;

    if (user && !comparePassword(password, passHash) ){
        return done()
    }


    return done(null,user)
}))

// Checks if the username exists in the MongoDB, if so, throws an error, otherwise, creates a new user
passport.use("signup", new LocalStrategy({
    passReqToCallback: true
}, async(req, username, password, done) => {
    const user = await User.findOne({username});
    if(user) {
        return done()
    }
    const {address} = req.body
    const hashedPassword = hashPassword(password)
    const newUser = new User({username, password: hashedPassword, address})
    await newUser.save()
    return done(null, newUser)
}))

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id,done) => {
    id = Types.ObjectId(id)
    const user = await User.findById(id)
    done(null, user)
})


app.use(passport.initialize())
app.use(passport.session())


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

// Signup 
app.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/error",
    failureMessage: "User already exists",
}), (req,res) => {
    req.session.user = req.user
    res.redirect("/profile")
})

app.get("/signup", isLoggedIn, (req,res) => {
    res.render("signup")
})


// Login
app.post("/login", passport.authenticate("login", {
    failureRedirect: "/error",
    failureMessage: "Invalid username or password",
}), (req,res) => {
    req.session.user = req.user
    res.redirect("/profile")
})

app.get("/login", isLoggedIn, (req,res) => {
    res.render("login")
})

// Profile
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

// Logout
app.get("/logout", (req,res) => {
    req.session.destroy()
    
    req.logout(() => {
        res.redirect("/login")
    })
    
})

// Home
app.get("/", (req,res) => {
    res.redirect("/profile");
})


// Error
app.get("/error", (req,res) => {
    const {messages} = req.session
    let error
    typeof messages !== "undefined" ? error = messages[messages.length-1] : error = "Something went wrong"
    
    res.render("error",{
        error
    })
})