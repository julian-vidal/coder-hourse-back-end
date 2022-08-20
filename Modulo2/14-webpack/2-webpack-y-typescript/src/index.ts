import express from "express";
const app = express();
import Persona from "./models/Persona";

import { getTime } from "./utils/time";

const persona = new Persona("Juan", "Perez")

app.get("/", (req,res)=>{
    res.send({
        message: `Hola ${persona.getNombre()}`,
        time: getTime().time
    });
})

app.listen(8080, () => {
    console.log(`Server listening at 8080`)
})