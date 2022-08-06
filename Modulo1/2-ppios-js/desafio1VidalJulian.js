class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre)
    }
}

const julian = new Usuario('Julian', 'Vidal', [{nombre: "El gran divorcio", author: "CS Lewis"}], ['Yoggi'])

console.log(julian.getFullName());
julian.addMascota('Max');
console.log(julian.countMascotas());
julian.addBook('Fe logica', 'Tim Keller')
console.log(julian.getBookNames());