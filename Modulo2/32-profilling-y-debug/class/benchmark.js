const autocannon = require("autocannon");
const {PassThrough} = require("stream")

const run = url => {
 const buf = [];
 const outputStream = new PassThrough()
 const inst = autocannon({
    url,
    connections: 500,
    duration: 20
 })

 autocannon.track(inst, {outputStream})

 outputStream.on("data", data => buf.push(data))
 inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf))
 })

}

console.log("Running all benchmarks in paralell")
run("http://localhost:8080/randoms-debug")
run("http://localhost:8080/randoms-nodebug")