// Config inicial
const express = require("express");
const app = express();
const PORT = 8080;
let frase = "Hola mundo cómo están"

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.send("Hola")
})

// Ejercicio 1 - https://docs.google.com/presentation/d/19t-eoJLXdSnplWAUJou4zKeyYUAgDKdmaCUk_IWLDX0/edit#slide=id.gf9c09881f9_0_243

app.get('/api/frase', (req,res) => {
    res.send(frase)
})


const getById = (num, array, label) => {
    if (!isNaN(num)) {
        if (num >0 && num <= array.length) {
            return { label: array[num - 1]}
        } else {
            return {error: "El número está fuera de rango"}
        }

    } else {
        return {error: "El parametro no es un número"}
    }
}

app.get('/api/letras/:num', (req, res) => {
    
    const num = parseInt(req.params.num);
    res.json(getById(num, frase, "letra"))
})

app.get('/api/palabras/:num', (req, res) => {
    const num = parseInt(req.params.num);

    const palabras = frase.split(" ");
    res.json(getById(num, palabras, "palabra"));
})


// Ejercicio 2 - https://docs.google.com/presentation/d/19t-eoJLXdSnplWAUJou4zKeyYUAgDKdmaCUk_IWLDX0/edit#slide=id.gf9c09881f9_0_333
// const sumar = (num1, num2) => num1+num2

app.get('/api/sumar/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    res.json({resultado: num1+num2})
})

app.get('/api/sumar/?num1=:num1&num2=:num2', (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    res.json({resultado: num1+num2})
})

app.post('/api', (req, res) => {
    res.json({mensaje: "ok post"})
})

app.put('/api', (req, res) => {
    res.json({mensaje: "ok put"})
})

app.delete('/api', (req, res) => {
    res.json({mensaje: "ok delete"})
})



// Ejercicio 3 - https://docs.google.com/presentation/d/19t-eoJLXdSnplWAUJou4zKeyYUAgDKdmaCUk_IWLDX0/edit#slide=id.gf9c09881f9_0_345

app.post('/api/palabras', (req, res) => {
    const {palabra} = req.body
    frase += ` ${palabra}`
    const palabras = frase.split(" ");
    
    res.json({
        agregada: palabra,
        pos: palabras.length
    })
})


app.put('/api/palabras/:pos', (req, res) => {
    const {palabra} = req.body;
    const {pos} = req.params;
    let palabras = frase.split(" ");
    const anterior = palabras[pos-1];
    palabras.splice(pos-1, 1, palabra);
    frase = palabras.join(" ")

    res.json({
        actualizada: palabra,
        anterior: anterior,
    })

})


app.delete('api/palabras/:pos', (req, res) => {
    const {pos} = req.params;
    let palabras = frase.split(" ");
    palabras.splice(pos-1, 1);
    

})

// Iniciar server
const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})

server.on("error", err => console.log())