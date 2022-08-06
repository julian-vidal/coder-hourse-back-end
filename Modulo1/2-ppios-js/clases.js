// Por convención, la 1ra letra de una clase va en mayuscula
class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    static saludo = "Buenas noches" // con static se definen atributos de clase, es decir todos los objetos generados con esa clase, van a contener ese atributo

    // Para definir un metodo, no hay que usar la palabra function
    saludoCompleto() {
        console.log(`Hola, soy ${this.nombre}`)
    }

    saludoEstatico() {
        console.log(`${Persona.saludo}, soy ${this.nombre}`)
    }
}

const pepe = new Persona('pepe', 5)
const juan = new Persona('juan',22);
console.log(pepe)
console.log(juan)

juan.saludoEstatico()
pepe.saludoCompleto()