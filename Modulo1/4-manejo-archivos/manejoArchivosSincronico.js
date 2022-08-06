const fs = require("fs");

// Leer archivos
const data = fs.readFileSync("./files/file1.txt", "utf-8")
console.log(data)

// Sobreescribir o crear archivos
fs.writeFileSync("./files/file2.txt", "Hello!\nasdasd ")


// Agregar contenidos a un archivo
fs.appendFileSync("./files/file1.txt", "\nNew line")

// Borrar un archivo
fs.unlinkSync("./files/file2.txt");