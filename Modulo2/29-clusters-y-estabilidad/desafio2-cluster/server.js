const http = require("http");
const args = process.argv.slice(2)
const port = args.length > 0 ? args[0] : 8080
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
console.log({numCPUs})


if (cluster.isMaster) {
    for (let i=0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on("exit", () => {
        console.log(`Worker died ${process.pid}`)
        cluster.fork()
    })
} else {
    const server = http.createServer()

server.on("request", (req,res) => {
    const pid = process.pid
    const date = new Date(Date.now())

    res.end(`PID: ${pid}. Date: ${date}. Port: ${port}`)
})

server.listen(port, () => {
    console.log(`Server listening in the port ${port}. PID: ${process.pid}`)
})
}



// node server.js || node server.js <PORT>

//ps aux | grep server.js

// After installing htop -> run htop in the terminal