/* ==========================================
Server Setup
========================================== */
const os = require("os")
const yargs = require("yargs")
const cluster = require("cluster")

let args = yargs(process.argv.slice(2)) 
    .alias({
        p: "port",
        m: "mode"
    })
    .default({
        port: 8080,
        mode: "FORK"
    })
    .argv



const express = require("express");
const app = express();
const PORT = args.port;
const MODE = args.mode;

app.use(express.json());
app.use(express.urlencoded({extended:true}))


const numCPUs = os.cpus().length

if(MODE == "CLUSTER") {

    if(cluster.isMaster){
        for(let i=0; i <numCPUs; i++){
            cluster.fork()
        }
        
        cluster.on("exit", () => {
            console.log(`Worker died ${process.pid}`)
            cluster.fork()
        })
        
    } else {
        app.listen(PORT, () => {
            console.log({
                PORT,
                MODE,
                "PROCESS ID": process.pid
            });
        })
    }

} else {
    app.listen(PORT, () => {
        console.log({
            PORT,
            MODE,
            "PROCESS ID": process.pid
        });
    })
}



// Compression
const compression = require("compression")
const gzipMiddleware = compression()


// Winston logger
const {logger} = require("./logger_config")

/* ==========================================
DB Connection
========================================== */
const {connect} = require("./database");
connect()

/* ==========================================
Session setup
========================================== */
const dotenv = require("dotenv");
dotenv.config()
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ttl = 60 * 60 * 24 // 1 day in seconds
const retries= 0

app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URL_SESSIONS || "mongodb://localhost:27017/sessions",
        ttl, //seconds
        retries
    }),
    secret: process.env.SECRET || "deb7dez-NKG5tpg*qjg",
    resave: false,
    saveUninitialized: true
}))


/* ==========================================
Passport setup
========================================== */
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const User = require("./user.schema")
const {comparePassword, hashPassword } = require("./utils")
const {Types} = require("mongoose")


// Check if the username and password provided match with a user in MongoDB 
passport.use("login", new LocalStrategy({usernameField: "email",
passwordField: "password"}, async (email, password, done) => {

    try {
        const user = await User.findOne({email})
        console.log(`user: ${user}`)

        if(!user || !comparePassword(password, user.password)){
            return done(null, false, {message: "User doesn't exist or password doesn't match"})
        }

        return done(null, user)

    } catch (error) {
        return done(error)
    }
    
}))

// Check if the username exists in MongoDB, If so, returns an error, otherwise, creates a new user
passport.use("signup", new LocalStrategy(
    {passReqToCallback: true,
        usernameField: "email",
        passwordField: "password"
    },
    async(req, email, password, done) => {
        console.log({email})
        const user = await User.findOne({email})
        if(user) {
            // console.log({user})
            return done(null, false, {message: "User already exists :p"})
        }

        const hashedPassword = hashPassword(password)
        console.log(hashedPassword);
        const newUser = new User ({
            email,
            password: hashedPassword
        })
        await newUser.save()
        return done(null, newUser)
    }
))

passport.serializeUser((user,done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id,done) => {
    id = Types.ObjectId(id)
    const user = await User.findById(id)
    done (null, user)
})

app.use(passport.initialize())
app.use(passport.session())




/* ==========================================
EJS setup
========================================== */
app.set("view engine", "ejs");
app.set("views", "./views/pages");


/* ==========================================
Middleware
========================================== */
const {isLoggedIn, isLoggedOut } = require("./middleware")


/* ==========================================
Class definition
========================================== */
class Container {
    constructor() {
        this.products = []
    }

    checkIfIdExists(id) {
        try {
            const positionId = this.products.findIndex(product => product.id === id);
            return positionId;
        } catch (err) {
            console.error(err)
        }
    }

}

const products = new Container();


/* ==========================================
Random Route
========================================== */
const {fork} = require("child_process")

app.get("/api/randoms", (req,res) => {
    let cant
    if (typeof req.query.cant != "undefined"){
        cant = parseInt(req.query.cant)
    } else {
        cant = 1e8
    }
    
    const child = fork("./child-random-numbers.js")
    child.send(cant)
    child.on("message", obj => {
        res.json(obj)
    })
})

/* ==========================================
Info Route
========================================== */
app.get("/info-debug", gzipMiddleware ,(req,res) => {
    const output = {
        inputArguments: process.argv.slice(2),
        platform: process.platform,
        nodeVersion: process.version,
        totalReservedMemoryRSS: process.memoryUsage().rss,
        executionPath: process.execPath,
        processID: process.pid,
        projectPath: process.mainModule.path,
        numberOfCPUs: os.cpus().length
    }
    res.json({output})
    console.log(output);
})


app.get("/info-nodebug", gzipMiddleware ,(req,res) => {
    const output = {
        inputArguments: process.argv.slice(2),
        platform: process.platform,
        nodeVersion: process.version,
        totalReservedMemoryRSS: process.memoryUsage().rss,
        executionPath: process.execPath,
        processID: process.pid,
        projectPath: process.mainModule.path,
        numberOfCPUs: os.cpus().length
    }
    res.json({output})
})

/* ==========================================
User Routes
========================================== */

// Signup 
app.post("/signup", passport.authenticate("signup", {
    failureRedirect: "/error",
    // failureMessage: "User already exists!!!",
    usernameField: "email",
    passwordField: "password"
}), (req,res) => {
    res.redirect("/")
})

app.get("/signup", [gzipMiddleware, isLoggedIn], (req,res) => {
    res.render("signup")
})


// Login
app.post("/login", passport.authenticate("login", {
    failureRedirect: "/error",
    failureMessage: "Invalid username or password",
    usernameField: "email",
    passwordField: "password"
}), (req,res) => {
    req.session.user = req.user
    res.redirect("/")
})

app.get("/login", [gzipMiddleware,isLoggedIn], (req,res) => {
    res.render("login")
})

// Index
app.get("/", [gzipMiddleware,isLoggedOut], (req,res) => {
    if(!req.session.counter) {
        req.session.counter = 1
    } else {
        req.session.counter++
    }
    

    res.render("index" , {
        user: req.user,
        counter: req.session.counter,
        products: products.products,
        expirationDate: req.session.cookie.sessionID
    })
    const logMsg = `Route: ${req.url}. Method: ${req.method} `
    logger.log("info", logMsg )
})

// Logout
app.get("/logout", (req,res) => {
    req.session.destroy()
    
    req.logout(() => {
        res.redirect("/login")
    })
    
})


// Error
app.get("/error", (req,res) => {
    const {messages} = req.session
    let error
    typeof messages !== "undefined" ? error = messages[messages.length-1] : error = "Something went wrong"
    
    const logMsg = `Route: ${req.url}. Method: ${req.method}. Error: ${error} `
    logger.log("error", logMsg)

    res.render("error",{
        error
    })
})




/* ==========================================
Products Routes
========================================== */

// GET all products
app.get("/productos", (req,res) => {
    try {
        res.render("products", {
            products: products.products,
        })
    } catch(err) {
        res.json({error: err})
    }
    
})

// POST a product
app.post("/productos", (req, res) => {
    try {
        const id = products.products.length + 1;
        const product = req.body;
        product.price = parseInt(product.price)
        product.id = id;
        products.products.push(product)
        return res.redirect("/")
    } catch (err) {
        res.json({error: err})
    }
})


/* ==========================================
404 page
========================================== */
app.get("*", (req, res) => {
    const logMsg = `Route: ${req.url}. Method: ${req.method} `
    logger.log("warn", logMsg)
    return res.json({message: "Route isn't defined. 404 error"})
    
})