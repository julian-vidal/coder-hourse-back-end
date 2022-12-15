# CLUSTER EN NODEJS

## ¿Qué es Cluster?
* Cuando hablamos de Cluster nos referimos al **uso de subprocesos que permite aprovechar la capacidad del procesador del servidor donde se ejecute la aplicación.**
* Como vimos la clase pasada, Node se ejecuta en un solo proceso (single thread), y entonces no aprovechamos la máxima capacidad que nos puede brindar un procesador multicore (múltiples núcleos).
* Al usar el cluster, lo que hacemos es, en el caso de estar ejecutando sobre un servidor multicore, hacer uso de todos los núcleos del mismo, aprovechando al máximo su capacidad.

## ¿Cómo funciona?
* Node nos provee un **módulo llamado cluster** para hacer uso de esto. El mismo, permite crear fácilmente procesos hijo.
* Lo que hace es clonar el worker maestro y delegarle la carga de trabajo a cada uno de ellos, de esa manera se evita la sobrecarga a un solo núcleo del procesador.
* Con un método similar al que vimos de Fork, se crea una copia del proceso actual. En ese momento, el primer proceso se convierte en maestro o master, y la copia en un trabajador o worker.

## MÓDULO CLUSTER

### Usar el módulo Cluster

* Primero requerimos el módulo cluster y el http para crear el servidor.
* En la constante numCPUs lo que hacemos es crear tantos workers como CPUs tengamos en el sistema.

```
const cluster = require("cluster");
const http = require('http');
const numCPUs = require("os" ).cpus().length;
```

* Es habitual hacer que el proceso master se dedique únicamente a gestionar a los workers, y que sean los workers los que hagan el “trabajo sucio”.
* Entonces, si entra al if crea workers, y si va al else abre el servidor. Como vemos en el código.


```
Add code and comments from slides 9 and 10
```

### Algunos comandos útiles
Si usamos Powershell:
`tasklist /fi "imagename eq node.exe"` -> lista todos los procesos de node.js activos
`taskkill /pid <PID> /f` -> mata un proceso por su número de PID

Si usamos Bash:
`fuser <PORT>/tcp [-k]` -> encuentra [y mata] al proceso ocupando el puerto PORT


# MÓDULO FOREVER
## ¿Qué es?

* Cuando ejecutamos un proyecto de Node en un servidor en el que lo tengamos desplegado, dejamos la consola “ocupada” con esa aplicación. Si queremos seguir haciendo cosas o arrancar otro proyecto no podemos, ya que tendríamos que detener la aplicación pulsando Ctrl+C quedando la consola libre nuevamente. 
* Por otro lado, si el servidor se parara por un fallo, nuestra aplicación no se arrancaría de nuevo.
* Ambos problemas se pueden resolver con el módulo **Forever** de Node.

## Comparación con Nodemon
* Como ya vimos, cada vez que hacemos cambios en alguno de los archivos del programa, debemos parar e iniciar nuevamente el servidor.
* El módulo Nodemon de Node, evita esto y se reinicia de forma automática ante cualquier cambio en los archivos del programa en ejecución.
* Sin embargo, Nodemon solo nos sirve en desarrollo. Cuando estamos en producción, no se puede hacer uso de este módulo
* Esta es la ventaja de Forever, ya que este puede utilizarse en producción. Además, nos sirve también para reiniciar el servidor ante un fallo del mismo.

## Usando ‘forever’ por línea de comando

`forever start <filename> [args]`: inicia un nuevo proceso
`forever list`: lista todos los procesos activos
`forever stop <PID>`: detiene un proceso según su id de proceso
`forever stopall`: detiene todos los procesos activos
`forever --help`: muestra la ayuda completa

# MÓDULO PM2

## ¿Qué es?
* Es un gestor de procesos (Process Manager), es decir, un programa que controla la ejecución de otro proceso. 
* Permite chequear si el proceso se está ejecutando, reiniciar el servidor si este se detiene por alguna razón, gestionar los logs, etc. 
* Lo más importante es que **PM2** simplifica las aplicaciones de Node para ejecutarlas como **cluster**.
* Es decir, que podemos escribir nuestra aplicación sin pensar en el cluster, y luego PM2 se encarga de crear un número dado de worker processes para ejecutar la aplicación.
* Es capaz de aguantar cantidades enormes de tráfico con un consumo de recursos realmente reducido y con herramientas que permiten realizar la monitorización de las aplicaciones de manera remota.
* La ventaja principal sobre el módulo forever es el tema del cluster embebido en este módulo, como mencionamos antes.

## Empezar a usarlo
* `npm i pm2`
* `pm2 start app.js`
* `pm2 list`