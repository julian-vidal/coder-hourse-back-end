# Global Process

## Process Object

* Como ya hemos visto, el objeto process es una variable global disponible en NodeJS que nos ofrece diversas informaciones y utilidades acerca del proceso que está ejecutando un script Node. 
* Contiene diversos métodos, eventos y propiedades que nos sirven no solo para obtener datos del proceso actual, sino también para controlarlo.
* Al ser un objeto global quiere decir que lo puedes usar en cualquier localización de tu código NodeJS, sin tener que hacer el correspondiente require().

### Datos del proceso
Algunos ejemplos de los datos del proceso que se pueden consultar con el objeto process.

```
"Directorio actual de trabajo:"+ process.cwdO);
"Id del proceso: "+ process.pid;
"Versión de Node: "+ process.version;
"Título del proceso:"+ process.title;
"Sistema operativo: "+ process.platform;
"Uso de la memoria:"+ process.memoryUsage();
```

### Salir de la ejecución
* A veces, se necesita salir de la ejecución de un programa en Node. Esto lo podemos conseguir mediante el método exit del objeto process. `process.exit()`
* Provocará que el programa acabe, incluso en el caso que haya operaciones asíncronas que no se hayan completado o que se esté escuchando eventos diversos en el programa.
* El método exit puede recibir opcionalmente un código de salida. Si no indicamos nada se entiende "0" como código de salida. `process.exit(3)`

### Función ‘.on( )’
* La mayor funcionalidad de process está contenida en la función `.on()`. 
Dicha función está escuchando durante todo el proceso que se ejecuta, es por eso que solo se puede actuar sobre su callback.
Se define como se definen los eventos en Javascript. En el método on, indicando el tipo de evento que queremos escuchar y un callback que se ejecutará cuando ese evento se dispare: `process.on("evento", callback);`

### Eventos más comunes (que se una en la funcion on)

#### **beforeExit**
* Normalmente, el proceso de Node se cerrará cuando no haya trabajo programado, pero un oyente registrado en el evento *beforeExit* puede realizar llamadas asincrónicas y, por lo tanto, hacer que el proceso de Node continúe.
No debe usarse como una alternativa al evento de exit a menos que la intención sea programar trabajo adicional.

```
process.on('beforeExit', (code) => {
console.log('Process beforeExit event with code: ', code);
1);
```

#### **exit**
* El evento exit se emite cuando el proceso de Node está a punto de salir como resultado de que:
  * El método process.exit( ) se llama explícitamente.
  * El ciclo de eventos de Node ya no tiene ningún trabajo adicional que realizar.
* No hay forma de evitar la salida del bucle de eventos en este punto, y una vez que todos los oyentes de 'salida' hayan terminado de ejecutar, el proceso de Node terminará.

```
process.on('exit', (code) => {
console.log(" About to exit with code: ${code}");
}):
```

#### **uncaughtException**

* Se emite cuando una excepción es devuelta hacia el bucle de evento. 
* Si se agregó un listener a esta excepción, no se producirá la acción por defecto (imprimir una traza del stack y salir).
* Es un mecanismo muy básico para manejar excepciones.

```
process.on('uncaughtException', function (err) {
console.log ('Excepción recogida: ' + err);
});

setTimeout (function () {
console.log('Esto seguirá ejecutándose.");
}, 500) ;
// se fuerza una excepción, pero no se recoge.
nonexistentFunc();
console.log('Esto no se ejecutará."):
```

### Propiedad process.execPath


Esta propiedad devuelve el nombre de la ruta absoluta del ejecutable que inició el proceso Node. Los enlaces simbólicos, si los hay, se resuelven.

Ejemplo de ruta: `"/usr/local/bin/node"`


### Propiedad process.stdout.write
* La propiedad *process.stdout* devuelve una secuencia conectada a stdout.
* Es un stream de escritura para stdout.
* Ejemplo de la definición de console.log: 

```
console.log = function (d) {
    process.stdout.write(d + \n');
};
```


# Child Process

## Single Thread (único hilo)

* Cuando ponemos en marcha un programa escrito en NodeJS se dispone de un único hilo de ejecución.
* Una ventaja de esto es que permite atender mayor demanda con menos recursos.
* Todas las operaciones que NodeJS no puede realizar al instante (operaciones no bloqueantes), liberan el proceso, es decir, se libera para atender otras solicitudes.
* El hilo principal podrá estar atento a solicitudes, pero una vez que se atiendan, Node podrá levantar de manera interna otros procesos para realizar todo tipo de acciones que se deban producir como respuesta a esas solicitudes. Estos procesos secundarios pueden crearse con el módulo *child_process*.

## Procesos hijo

* Un proceso hijo es un proceso creado por un proceso padre.
* Node nos permite ejecutar un comando del sistema dentro de un proceso hijo y escuchar su entrada / salida. 
* Los desarrolladores crean de forma habitual procesos secundarios para ejecutar comandos sobre su sistema operativo cuando necesitan manipular el resultado de sus programas Node con un shell.
* Podemos crear procesos hijo de 4 formas diferentes:
  * exec( )
  * execFile( )
  * spawn( )
  * fork( )

### Proceso secundario con exec( )
* Requerimos el comando exec del módulo *child_process*.
* En la ejecución de la función exec, el primer argumento es el comando ls-lh. Este, enumera todos los archivos y carpetas del directorio actual en formato largo, con un tamaño total de archivo en unidades legibles por el ser humano en la parte superior del resultado.

* El segundo argumento es el *callback*, el cual a su vez tiene 3 parámetros.
  * Si el comando no se ejecuta, se imprime el motivo en *error*.
  * Si el comando se ejecutó correctamente, cualquier dato que escriba al flujo de resultado estándar se captura en *stdout*
  * Cualquier dato que escriba al flujo error estándar se captura en *stderr*.

* Al ejecutar el archivo en la terminal el output será como el que se muestra en la imagen.

* Esto enumera el contenido del directorio child-processes en formato largo, junto con el tamaño del contenido en la parte superior. Sus resultados tendrán su propio usuario y grupo en lugar de sammy. 
* Esto muestra que el programa listFiles.js ejecutó correctamente el comando shell ls -lh.


```
const { exec } = require('child process');

exec("ls -lh", (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`)
        return
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: \n${stdout}`)
});
```

### Proceso secundario con  ‘execFile( )’.
La diferencia principal entre las funciones execFile() y exec() es que el primer argumento de execFile() es ahora una ruta a un archivo ejecutable en vez de un comando.
El resultado del archivo ejecutable se guarda en un búfer como exec(), al que accedemos a través de una función callback con los parámetros error, stdout y stderr.

```
const {execFile} = require("child_process")

execFile(__dirname + "/program.sh", (err, stdout, stderr) => {
    if (err) {
        console.error(`error: ${err.message}`)
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: \n${stdout}`)
})

console.log("Hola")
```


### Proceso secundarion con spawn()
Básicamente es mas eficiente que exec y execFile

* La función spawn() ejecuta un comando en un proceso. Esta función devuelve datos a través de la API del flujo. Por tanto, para obtener el resultado del proceso secundario, debemos escuchar los eventos del flujo.
* Con exec() y execFile(), todos los datos procesados se guardan en la memoria de la computadora. Para cantidades de datos más grandes, esto puede degradar el rendimiento del sistema. 
* En el caso de spawn(), con un flujo, los datos se procesan y transfieren en pequeños trozos. Por lo tanto, puede procesar una gran cantidad de datos sin usar demasiada memoria en un momento dado.

```
const {spawn} = require("child_process")

const child = spawn("ls", ["-lh"])

child.stdout.on("data",data => {
    console.log(`stdout: ${data}`)
})

child.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
})

console.log("Hola")
```

### Proceso secundario con fork
* La función *fork()* es una variación de *spawn()* que permite la comunicación entre el proceso principal y el secundario.
* Además de recuperar datos desde el proceso secundario, un proceso principal puede enviar mensajes al proceso secundario en ejecución. Del mismo modo, el proceso secundario puede enviar mensajes al proceso principal.
* Si un servidor web está bloqueado, no puede procesar ninguna nueva solicitud entrante hasta que el código de bloqueo haya completado su ejecución. **Fork evita el bloqueo** corriendo el proceso secundario bloqueante en un hilo aparte.


This will block the server:
```
const http = require("http")
const server = http.createServer()


let visits = 0;

const calc = () => {
    let counter = 0
    for (i=0; i< 1e9; i++){
        counter += i
    }
    return counter
}

server.on("request", (req, res) => {
    visits ++
    let {url} = req

    switch(url) {
        case "/":
            res.end(`visits: ${visits}`)
            break;
        case "/calculo-bloq":
            const suma = calc()
            res.end(`suma: ${suma}`)
            break;
        default:
            res.end(404)
            break;
    }
})

const PORT = 8080
server.listen(PORT, ()=> {
    console.log(`Server listening at port ${PORT}`);
})

```