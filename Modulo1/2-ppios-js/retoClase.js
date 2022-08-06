// Definir la función mostrarLista que reciba una lista de datos y muestre su contenido, si no está vacía, o de lo contrario muestre el mensaje: “lista vacía”. Luego, invocarla con datos de prueba para verificar que funciona bien en ambos casos.
function mostrarLista(lista) {
    return lista.length > 0 ? console.log(lista) : console.log('Lista Vacia')
}

lista = ['manzana', 'pera', 'sandia']
// lista = [];
mostrarLista(lista);


// Definir una función anónima que haga lo mismo que la del punto 1, e invocarla inmediatamente, pasando una lista con 3 números como argumento.

(
    function(myLista) {
        return myLista.length > 0 ? console.log(myLista) : console.log('Lista Vacia')
    }
)([1, 2, 3]);
// )([]);

// Definir la función crearMultiplicador  que reciba un número y devuelva una función anónima que reciba segundo número y dé como resultado el producto de ambos. Luego, a partir de la función definida, crear dos funciones duplicar y triplicar, y probarlas con diferentes valores.

function crearMultiplicador(num1) {
    return function(num2){
        console.log(num1*num2)
        console.log(`num1 es ${num1} y num2 es ${num2}`)
    }
}

const duplicar = crearMultiplicador(2)(3)
const triplicar = crearMultiplicador(5)(3)