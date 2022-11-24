const express = require("express")
const cluster = require("cluster")
const {cpus} = require("os")


const numCPUs = cpus().length
const PORT = process.argv[2] || "8080"
const MODE = process.argv[3] === "FORK"


const genRandomNumbers = (total=10000) => {
    const randomNumbers = []

    for (let i=0; i<total; i++){
        const randomNumber = Math.floor(Math.random() * 10)
        randomNumbers.push(randomNumber)
    }

    return randomNumbers
}



if (MODE && cluster.isPrimary){
    console.log(`Cluster started. CPUS: ${numCPUs}`)
    console.log(`PID: ${process.pid}`)
    for (let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", worker => {
        console.log(`${new Date().toLocaleString()}: Worker ${worker.process.pid} died`)
        cluster.fork();
    })

}  else {
    const app = express()

    // 
    app.get("/randoms-debug", (req,res) => {
        const randomNumbers = genRandomNumbers()
        res.json({randoms: randomNumbers })
        console.log(randomNumbers)
    })


    // 
    app.get("/randoms-nodebug", (req, res) => {
        const randomNumbers = genRandomNumbers()
        res.json({randoms: randomNumbers })
    })


    app.listen(PORT, () => {
        console.log(`PID: ${process.pid}. Express server listening in port ${PORT}. CLUSTER MODE: ${MODE}`);
    });

}




/*
Commands:
1. node --inspect 4-fork-cluster.js 8080 CLUSTER
2. In Chrome, go to chrome://inspect and select the proper file 
3. Click "start"
4. npx artillery quick --count 50 -n 50 "http://localhost:8080/randoms-debug" > results_debug_cluster.txt
5. In Chrome dev, click "stop"
6. Click "start"
7. npx artillery quick --count 50 -n 50 "http://localhost:8080/randoms-nodebug" > results_nodebug_cluster.txt
8. In Chrome dev, click "stop"
9. Stop the server
10. node --inspect 4-fork-cluster.js 8080
11. Start a new profiling in Chrome
12. npx artillery quick --count 50 -n 50 "http://localhost:8080/randoms-debug" > results_debug_fork.txt
13. In Chrome dev, click "stop"
14. Click "start"
15. npx artillery quick --count 50 -n 50 "http://localhost:8080/randoms-nodebug" > results_nodebug_fork.txt
16. In Chrome dev, click "stop"
17. Compare chrome profilings and artillery analysis: Cluster withouth console.log make provides the best performance

*/