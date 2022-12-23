/* ==========================================
Server Setup
========================================== */
const os = require("os")
const cluster = require("cluster")
import { PORT, MODE, DATABASE } from "./config"; 

const express = require("express");
const app = express();

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
                DATABASE,
                "PROCESS ID": process.pid
            });
        })
    }

} else {
    app.listen(PORT, () => {
        console.log({
            PORT,
            MODE,
            DATABASE,
            "PROCESS ID": process.pid
        });
    })
}

/* ==========================================
DB Connection
========================================== */
import {MongoConnection } from "./utils/database"
MongoConnection.connect()


/* ==========================================
Products Routes
========================================== */

import productRouter from "./modules/product/product.router";
app.use("/products", productRouter )