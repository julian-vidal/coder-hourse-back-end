const fs = require("fs");

// Read a file
// fs.readFile("./files/date.txt", "utf-8", (error, content) => {
//     if(error) {
//         throw new Error("Something went wrong");
//     } else {
//         console.log(content)
//     }
// })

// Overwrite a file
// fs.writeFile("./files/file1.txt", "Hello world", error => {
//     if (error) {
//         throw new Error("Ooops, something went wrong");
//     } else {
//         console.log('Updated!');
//     }
// })


// Append content to a file
// fs.appendFile("./files/file1.txt", "\nNew Line", error => {
//     if (error) {
//         throw new Error("Error");
//     } else {
//         console.log("Content has ben appended")
//     }
// });


// Delete a file
// fs.unlink("./files/file1.txt", error => {
//     if (error) {
//         throw new Error("Error");
//     } else {
//         console.log("Content has ben appended")
//     }
// });

// Create a folder
// fs.mkdir("./files/test", error => {
//     if (error) {
//         throw new Error("Error");
//     } else {
//         console.log("Content has ben appended")
//     }
// })


// Read files within a folder
// fs.readdir("./files", (error, data) => {
//     if (error) {
//         throw new Error("Error");
//     } else {
//         console.log(data)
//     }
// })


// Ahora se pueden usar promises con then y catch o async y await

// Forma1: Then y Catch
function leerTC(file) {
    fs.promises.readFile(file, "utf-8")
        .then(content => {
            console.log(content)
        })
        .catch(err => {
            throw new Error("Error reading a file");
        })
}

// leerTC("./files/date.txt");


// Forma2: Async y await

async function leerAA(file) {
    try {
        const contenido = await fs.promises.readFile(file, "utf-8");
        console.log(contenido)
    }
    catch(err) {
        throw new Error(err);
    }
}

leerAA("./files/date.txt");