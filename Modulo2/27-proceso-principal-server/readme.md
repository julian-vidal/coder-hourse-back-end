# Passing paramaters to the server

## Through the CLI

* Los argumentos de la línea de comandos son cadenas de texto que se utilizan para pasar información adicional a un programa, cuando se ejecuta una aplicación a través del interfaz de línea de comandos (CLI) de un sistema operativo. 
* Suelen incluir información que se utiliza para establecer la configuración o los valores de propiedad de una aplicación.
* En la mayoría de los casos, los argumentos se pasan después del nombre del programa en su indicador. Un ejemplo de la sintaxis de los argumentos de la línea de comandos se ve así:
`[runtime] [script_name] [argiment-1, argument-2, ..., argument-n `

En nuestro caso, `[runtime] = node`.

### Pros
* Puede pasar información a una aplicación antes de que comience. Esto es útil si deseamos realizar ajustes de configuración de gran número.
* Los argumentos de la línea de comandos se pasan como cadenas al programa. Los tipos de datos de cadena se pueden convertir fácilmente a otros tipos de datos dentro de una aplicación, lo que hace que los argumentos sean muy flexibles.
* Puede pasar un número ilimitado de argumentos a través de la línea de comando.
* Los argumentos de la línea de comandos se utilizan junto con scripts y archivos por lotes, lo que es útil para las pruebas automatizadas.

### Cons
* La mayor desventaja de pasar información a través de la línea de comandos es que la interfaz tiene una curva de aprendizaje pronunciada, por lo que es difícil de usar para la mayoría de las personas a menos que tengan mucha experiencia en el uso de herramientas CLI.
* Las aplicaciones de línea de comandos pueden ser difíciles de usar a menos que esté usando una computadora de escritorio o portátil, por lo que normalmente no se usan en dispositivos más pequeños como teléfonos o tabletas.


## Through process.argv

* La forma más sencilla de recuperar argumentos en Node es a través del **process.argv**. Este es un objeto global que podemos usar sin importar bibliotecas adicionales.
* Simplemente necesitamos pasar argumentos a una aplicación Node, tal como mostramos anteriormente, y se puede acceder a estos argumentos dentro de la aplicación a través del process.argv.

### ¿Cómo se usa process.argv?
1. El primer elemento del process.argv, el array, siempre será una ruta del sistema de archivos que apunta al Node ejecutable. 
2. El segundo elemento es el nombre del archivo JavaScript que se está ejecutando.
3. El tercer elemento es el primer argumento que realmente pasó el usuario.


### Using process.argv
* Vemos un script de Node simple que imprima todos los argumentos de la línea de comando pasados ​​a la aplicación, junto con su índice. En el archivo “processargv.js”
* Lo que hace este script es recorrer el process.argv array e imprime los índices, junto con los elementos almacenados en esos índices. Es muy útil para depurar si alguna vez nos preguntamos qué argumentos estamos recibiendo y en qué orden.


```
for (let j=0; j < process.argv.length; j++){
    console.log(`${j} -> ${process.argv[j]} `)
}
```

y se llama asi: `node 1-ejm-argv.js 1 2 3 4 5`

## Through minimist
* Otra forma de recuperar argumentos de línea de comando en una aplicación Node es usando el módulo **minimist**. 
* Nos permite analizar un array de strings (usualmente obtenido de los argumentos ingresados por línea de comando) y lo transformará en un objeto más fácil de usar, ya que nos permite acceder acceder a los elementos mediante su nombre.
* Lo instalamos como: `npm i minimist`
* Lo podemos requerir en nuestros archivos como: `const parseArgs = require("minimist")`

### Using minimist
Primero, usamos el método slice sobre el array de argumentos del objeto global process: argv. En este caso, el método elimina todos los elementos del array anteriores a partir del índice que se le pasa como parámetro. Como sabemos que los argumentos que pasamos manualmente se almacenan a partir del segundo índice, pasamos como argumento un 2.

```
const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));
```

Some examples:

```
console.log(parseArgs(['1', '2', '3', '4']));
// { _: [ 1, 2, 3, 4 ] }

console.log(parseArgs(['-a', '1', '-b', '2', '3', '4']));
// { _: [ 3, 4 ], a: 1, b: 2 }

console.log(parseArgs(['--n1', '1', '--n2', '2', '3', '4']));
// { _: [ 3, 4 ], n1: 1, n2: 2 }

console.log(parseArgs(['-a', '1', '-b', '2', '--colores', '--cursiva']));
// { _: [], a: 1, b: 2, colores: true, cursiva: true }

console.log(parseArgs(['-a', '1', '-b', '2', '-c', '-x']));
// { _: [], a: 1, b: 2, c: true, x: true }
```

* Ante un argumento que comienza con un guión solo, crea un atributo cuyo nombre será la primera letra dsp del guión, y cuyo valor será todo lo restante hasta el próximo argumento
* Si queremos usar palabras como nombres de atributos, debemos anteponerle un doble guión, y su valor será el argumento siguiente. 
* Si luego de un argumento guionado (simple o doble), no se encuentra ningún otro argumento, o el argumento siguiente también es guionado, el primero se interpreta como un valor booleano con valor true.
* Si existen valores sueltos que no vienen precedidos por ningún argumento guionado, todos ellos se agrupan en un array bajo el nombre _ (guión bajo).

Además también podemos agregar algunas opciones adicionales. Entre ellas, podemos definir algunos valores por defecto para argumentos que no estén presentes:

```
const options = { default: { nombre: 'pepe', apellido: 'copado' }}

console.log(parseArgs(['-a', '1', '-b', '2', 'un-valor-suelto', '--nombre', 'juanita'], options));
// { _: [ 'un-valor-suelto' ], a: 1, b: 2, nombre: 'juanita', apellido: 'copado' }
```

Y podemos agregarle algunos alias para renombrar los valores ingresados como argumentos, dándoles nombres más descriptivos

```
const options = { alias: { a: 'campoA', b: 'campoB', } }

console.log(parseArgs(['-a', '1', '-b', '2'], options));
// { _: [], a: 1, campoA: 1, b: 2, campoB: 2 }

```


## Through Yargs

* Otro módulo que nos ayudará a analizar los argumentos de la línea de comandos pasados ​​a los programas de Node es el módulo yargs. Inicialmente funciona de igual manera que Minimist, con algunas modificaciones y en su sintaxis. Sin embargo, esta librería posee muchísimas más funcionalidades.
* Lo instalamos con npm `npm i yargs` y lo utilizamos de la siguiente manera:

```
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv
```

Si queremos agregar valores por defecto, lo hacemos de la siguiente manera:
```
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
  .default({
    nombre: 'pepe',
    apellido: 'copado'
  })
 .argv

```


# Variables de entorno
* Las variables de entorno son variables externas a nuestra aplicación que residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando. Una variable de entorno es simplemente un nombre asignado a un valor.
* Nos permiten administrar la configuración de nuestras aplicaciones por separado de nuestro código base. 
* Las configuraciones separadas facilitan la implementación de nuestra aplicación en diferentes entornos (desarrollo, test, producción, etc).
( Por convención, el nombre se escribe con mayúscula y los valores son cadenas de texto, por ejemplo: `PORT=8080`.
* Normalmente, nuestras aplicaciones requieren que se establezcan muchas variables de entorno para que funcionen. Al confiar en configuraciones externas, nuestra aplicación se puede implementar fácilmente en diferentes entornos. Estos cambios son independientes de los cambios en el código, por lo que no requieren que nuestra aplicación sea reconstruida.
* Los datos que cambian según el entorno en el que se ejecuta su aplicación deben configurarse como variables de entorno. Algunos ejemplos comunes son:
  * Dirección y Puerto HTTP.
  * Credenciales de Base de Datos.
  * Ubicación de archivos y carpetas estáticos.
  * Credenciales de API's externas.

## Using env variables


* En primer lugar, en nuestro proyecto, creamos un archivo llamado **config.js** que centralizará nuestras variables de entorno.

```
// config.js
module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development"
    HOST: process.env.HOST || "127.0.0.1"
    PORT: process.env.PORT || 3000
}
```

Luego, en el archivo server.js requerimos el archivo de config. Creamos un servidor con Express usando las variable de entorno definidas.

```
//server.js
const config = require("./config")
const express require("express")
const app = express()

const {PORT, HOST} = config

app.listen(PORT, HOST, () => {
    console.log(`App listening at http://${HOST}:${PORT}`)
})
```

* El acceso a las variables de entorno en Node es compatible desde que inicia nuestra aplicación. 
* Cuando el proceso Node se inicia, proporciona automáticamente el acceso a todas las variables de entorno existentes mediante el objeto process.env. En el archivo config.js, la variable HOST estará definida por la variable process.env.HOST, si no se encuentra definida esta variable, será reemplazada por el valor 127.0.0.1. (puesto por default).
* Hasta este punto nuestra aplicación se inicializará en función de las variables de entorno que se definan.


Para configurar las variables, ejecutamos en la consola `export PORT=8080`


