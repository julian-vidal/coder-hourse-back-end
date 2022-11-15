import { faker } from '@faker-js/faker';


module.exports = function(n) {
    const usuarios = [];
    for(let i=0; i < n; i++){
        const _usuario = {
            name: faker.name.fullName(),
            age: faker.datatype.number({max: 12, min:50})
        }
        
        usuarios.push({nombre: _nombre, apellido: _apellido, color: _color})

    }

    return usuarios
}