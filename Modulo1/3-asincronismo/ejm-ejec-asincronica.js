// Intro
/*
console.log('Inicio del programa');

setTimeout(() => console.log('Pasó 1 segundo'),1000)

console.log('Fin del programa');

*/

// Forma 1 - Funciones Bloqueantes
/*
const delay = ret => {
    for(let i=0; i<ret*3e6;i++);
}

function hacerTarea(num){
    console.log(`Haciendo tarea ${num}`)
    delay(100)
}

console.log('Inicio de tareas');
hacerTarea(1)
hacerTarea(2)
hacerTarea(3)
hacerTarea(4)
console.log('fin de tareas')
console.log('Otras tareas');
*/

// Forma 2 - Funciones No-Bloqueantes
function hacerTarea(num, cb) {
    setTimeout(cb, 100)
    console.log(`Haciendo tarea ${num}`)
    
}

console.log('Inicio de tareas');
hacerTarea(1, () => {
    hacerTarea(2, () => {
        hacerTarea(3, () => {
            hacerTarea(4, () => {
                console.log('Fin de tareas')
            })
        })
    })
})

console.log('Otras tareas');