const http = require('http');

const server = http.createServer((req,res) => {
    // res.end("Hola Mundo");
    let hour = new Date().getHours();
    let saludo;
    if (hour>5 && hour<= 12) {
        saludo = "Buenos dias!"
    } else if (hour > 12 && hour<=19) {
        saludo = "Buenas tardes!"
    } else {
        saludo = "Buenas noches!"
    }
    res.end(saludo)
})

const serverConnected = server.listen(8080, () => {
    console.log(`Server escuchando ${serverConnected.address().port}`)
})