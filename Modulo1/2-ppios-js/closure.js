// Desde la jerarquia inferior se puede acceder a variables de jerarquias superiores
function gritarNombre(nombre) {
    const signosExclamacion = '!!!';
    return function() {
        console.log(`${nombre}${signosExclamacion}`)
    }
}

const f = gritarNombre('Hola');
f();