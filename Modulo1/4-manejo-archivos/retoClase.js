/*
Realizar un programa que:
A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
B) Lea nuestro propio archivo de programa y lo muestre por consola.
C) Incluya el manejo de errores con try catch (progresando las excepciones con throw new Error).
*/

const fs = require("fs");

const saveFile = () => {
    const date = new Date(Date.now()).toLocaleString();
    fs.writeFileSync("./files/date.txt", date);
}

const readAFile = uri => {

    try{
        const file = fs.readFileSync(uri, "utf-8");
        console.log(file);
    } catch(err) {
        throw new Error("The file couldn't be found")
    }
}


saveFile();
readAFile("./files/date.txt");
