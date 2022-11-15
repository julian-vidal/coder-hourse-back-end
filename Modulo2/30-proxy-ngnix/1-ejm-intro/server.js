const express = require("express")

const app = express()

const PORT = parseInt(process.argv[2]) || 8081

app.get("/datos", (req,res) => {
    console.log(`PORT: ${PORT} - DATE: ${Date.now().toLocaleString()}`)
    res.send(`NGNIX server at port ${PORT} - PID: ${process.pid} - DATE: ${Date.now().toLocaleString() }`)
})

app.listen(PORT, (err) => {
    if (!err) console.log(`Server listening at port ${PORT} - PID ${process.pid}`)
})