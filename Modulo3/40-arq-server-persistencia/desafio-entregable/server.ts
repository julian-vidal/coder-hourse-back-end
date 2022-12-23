/* ==========================================
Server Setup
========================================== */
const os = require("os")
// const yargs = require("yargs")
const cluster = require("cluster")

import { PORT, MODE } from "./config"; 
/*
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

*/

const express = require("express");
const app = express();
// const PORT = args.port;
// const MODE = args.mode;

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

/* ==========================================
DB Connection
========================================== */
import {MongoConnection } from "./database"
MongoConnection.connect()
// const {connect} = require("./database");
// connect()

/* ==========================================
Session setup
========================================== */

/*
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
*/

/* ==========================================
Passport setup
========================================== */
/*
const passport = require("passport");
app.use(passport.initialize())
app.use(passport.session())
*/

/* ==========================================
EJS setup
========================================== */
app.set("view engine", "ejs");
app.set("views", "./views/pages");


/* ==========================================
Frontend Routes
========================================== */

// const routerFrontend = require("./routes/FrontEndRouter")
// app.use("/", routerFrontend )

/* ==========================================
Products Routes
========================================== */

// const routerProducts = require("./routes/ProductRouter")
import productRouter from "./modules/product/product.router";

app.use("/products", productRouter )