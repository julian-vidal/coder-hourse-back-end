const http = require("http")
const server = http.createServer()
const {fork} = require("child_process")

let visits = 0;

const calc = () => {
    let counter = 0
    for (i=0; i< 1e9; i++){
        counter += i
    }
    return counter
}

server.on("request", (req, res) => {
    visits ++
    let {url} = req

    switch(url) {
        case "/":
            res.end(`visits: ${visits}`)
            break;
        case "/calc-blocking":
            const sum = calc()
            res.end(`sum: ${sum}`)
            break;
        case "/calc-non-blocking":
            const child = fork("./child.js")
            child.send("start")
            child.on("message", msg => {
                res.end(`sum: ${msg}`)
            })
            break;
        default:
            res.end(404)
            break;
    }
})

const PORT = 8080
server.listen(PORT, ()=> {
    console.log(`Server listening at port ${PORT}`);
})
