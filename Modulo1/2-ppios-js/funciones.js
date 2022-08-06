// Funciones anonimas - el return de foo es una funcion sin nombre (anonima)
function foo() {
    return function() {
        console.log("Funcion Anonima");
    }
}

foo(); // Esto no muestra nada en consola

const f = foo(); // f toma el valor de la funcion anonima

f(); // Esto si muestra msg en consola


// Funciones IIFE - Immediately Invoked Function Expressions

(
    function() {
        console.log('IIFE function')
    }
)();