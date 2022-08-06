const fin = () => console.log("It's over")

/*
function mostrarLetras(text, time, cb){

    setTimeout(() => {
        for (i=0; i<text.length;i++){
            console.log(text[i])
        }
    }, time)
    
    // for (i=0; i<text.length;i++){
        
        // setTimeout(() => {console.log(i)}, 500)
        
        // DelayNode(time)
    // }
    // delay(100)
    cb()
}


mostrarLetras('Hola', 1000, fin);
*/

/*
Desarrollar una función ‘mostrarLetras’ que reciba un string como parámetro y permita mostrar una vez por segundo cada uno de sus caracteres. 
Al finalizar, debe invocar a la siguiente función que se le pasa también  como parámetro: const fin = () => console.log('terminé')
Realizar tres llamadas a ‘mostrarLetras’ con el mensaje ‘¡Hola!’ y demoras de 0, 250 y 500 mS verificando que los mensajes de salida se intercalen.
*/

function mostrarLetras(text, time, cb) {
    let i = 0;
    const imprimir = setInterval(() => {
        if (text[i] != undefined) {
            console.log(text[i])
        } else {
            cb();
            clearInterval(imprimir);
        }
        i++
    }, time)
}

mostrarLetras('Hola', 0, fin)
mostrarLetras('Hola', 250, fin)
mostrarLetras('Hola', 500, fin)