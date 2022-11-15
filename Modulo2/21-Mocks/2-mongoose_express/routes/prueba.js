const {Router} = require("express")
const { faker } = require('@faker-js/faker');



const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz



const testRouter = Router();

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

function randomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// const generarUsuarios = n => {
//     const usuarios = [];
//     for(let i=0; i < n; i++){
//         const _nombre= nombres[randomInt(0,nombres.length-1)];
//         const _apellido = apellidos[randomInt(0, apellidos.length-1)];
//         const _color = colores[randomInt(0,colores.length-1)];
//         usuarios.push({nombre: _nombre, apellido: _apellido, color: _color})

//     }

//     return usuarios
// }


const generarUsuariosConFaker = n => {
    const usuarios = [];
    for(let i=0; i < n; i++){
        const _nombre= faker.name.firstName() ;
        const _apellido = faker.name.lastName();
        const _color = faker.color.human();
        usuarios.push({nombre: _nombre, apellido: _apellido, color: _color, id: i+1})

    }

    return usuarios
}


testRouter.get("/", (req,res) => {
    // DESAFIO 1
    // const usuarios = generarUsuarios(10)

    // DESAFIO 2
    const cant = req.query.cant || 10;
    const usuarios = generarUsuariosConFaker(cant)
    
    
    res.json(usuarios)
})

module.exports = testRouter