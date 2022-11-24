const express = require("express")
const app = express()
const PORT = process.argv[2] || "8080"

const genRandomNumbers = (total=10000) => {
    const randomNumbers = []

    for (let i=0; i<total; i++){
        const randomNumber = Math.floor(Math.random() * 10)
        randomNumbers.push(randomNumber)
        return randomNumbers
    }
}


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
    console.log(`PID: ${process.pid}. Servidor express escuchando en puerto ${PORT}`);
});

/*
Commands:
1. node --inspect 3-console-log.js
2. In Chrome, go to chrome://inspect and select the proper file 
3. Click "start"
4. npx artillery quick --count 50 -n 50 "http://localhost:8080/randoms-debug" > results_debug.txt
5. In Chrome dev, click "stop"
6. Start a new profilin in Chrome
7. npx artillery quick --count 50 -n 50 "http://localhost:8080/randoms-nodebug" > results_no-debug.txt
8. In Chrome dev, click "stop"
9. Compare chrome profilings and artillery analysis: Console.log make the server slower!


*/