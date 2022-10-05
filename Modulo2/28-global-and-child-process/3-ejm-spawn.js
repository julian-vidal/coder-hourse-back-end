const {spawn} = require("child_process")

const child = spawn("ls", ["-lh"])

child.stdout.on("data",data => {
    console.log(`stdout: ${data}`)
})

child.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
})

console.log("Hola")