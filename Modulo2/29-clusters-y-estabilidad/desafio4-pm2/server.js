const http = require("http");
const args = process.argv.slice(2)
const port = args.length > 0 ? args[0] : 8080

const server = http.createServer()

server.on("request", (req,res) => {
    const pid = process.pid
    const date = new Date(Date.now())

    res.end(`PID: ${pid}. Date: ${date}. Port: ${port}`)
})

server.listen(port, () => {
    console.log(`Server listening in the port ${port}. PID: ${process.pid}`)
})

// pm2 start server.js --name=Server1 --watch -i max -- 8081 // cluster mode -> balance mode
// pm2 start server.js --name=Server2 --watch  -- 8082 //  fork mode 
// pm2 monit

//pm2 describe Server1