const express = require("express");
const {Router} = express;
const app = express();
const PORT = 8080;

const personas = [];
const mascotas = [];



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/public", express.static(__dirname + "/public"));

// Middleware a nivel de applicacion
app.use((req, res, next) => {
    const timestamp = Date.now().toLocaleString();
    console.log(`[${timestamp}]: ${req.method}: ${req.route}`)
    next()
})

// Routers
const routerPersonas = Router();
const routerMascotas = Router();


// Middleware a nivel de router
routerMascotas.use((req, res, next) => {
    console.log(`Peticion al endpoint mascotas`)
    next();
})



app.use('/api/personas', routerPersonas);
app.use('/api/mascotas', routerMascotas);


// Routers para persona
routerPersonas.get("/", (req, res) => {
    res.json(personas)
})

routerPersonas.post("/", (req, res) => {
    // Forma 1
    // const {nombre, apellido, edad} = req.body;
    // const persona = {nombre: nombre, apellido: apellido, edad: edad}

    // Forma 2
    const persona = req.body;
    personas.push(persona);
    res.json(persona)
})


// Routers para mascotas
routerMascotas.get("/", (req, res) => {
    res.json(mascotas)
})

routerMascotas.post("/", (req, res) => {
    const mascota = req.body;
    mascota.id = mascotas.length;
    mascotas.push(mascota);
    res.json(mascota)
})



// Iniciar server




const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})

server.on("error", err => console.log())