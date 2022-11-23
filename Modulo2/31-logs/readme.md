# Rendimiento en producción

1. Usar compresión gzip
   * Su uso puede disminuir significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web. Utilizamos **gzip**, un **middleware de compresión** de Node para la compresión en aplicaciones Express.
   * IMPORTANT: **No** resulta la mejor opción para una aplicación con tráfico elevado en producción.

2. No utilizar funcion síncronas
3. Realizar un registro correcto:
   * console.log y console.err son funciones síncronas
   * Útil para depuración y registro de al actividad de la app

4. Manejar las excepciones correctamente: Usar try/catch

# Setup of the enviroment

1. Establecer NODE_ENV en producción
   *   La variable de entorno NODE_ENV especifica el entorno en el que se ejecuta una aplicación (normalmente, desarrollo o producción). Una de las cosas más sencillas que puede hacer para mejorar el rendimiento es establecer NODE_ENV en producción. Puede mejorarlos hasta 3 veces.
   *   Al establecerlo, Express almacenar en caché las plantillas de vistas y los archivos CSS generador y genera menos mensajes de error detallados.
   *   Si necesitamos escribir código específico del entorno, podemos comprobar el valor de NODE_ENV con process.env.NODE_ENV. 
   *   Tener en cuenta que comprobar el valor de una variable de entorno supone una reducción de rendimiento, por lo que debe hacerse de forma moderada. Lo mejor es configurar el modulo para que solo se lea esa variable 1 vez y se guarde en memoria

2. Que la App se reinicie automáticamente. **pm2** ayuda en esto

3. Ejecutar la App en un Cluster. **pm2** ayuda en esto

4. Almacenar en caché los resultados de la solicitud: Utilizar un servidor de almacenamiento en memoria caché como Nginx, mejora significativamente la velocidad y el rendimiento de la aplicación.

5. Utilizar el balanceador de carga. **NGINX** ayuda con esto

6. Utilizar un proxy inverso. **NGINX** ayuda con esto

# Using Gzip
1. `npm i compression`
2.  
```
const compresison = require("compression")
const gzipMiddleware = compresison()

const generateString = () => {
    return Array(1000).fill("Hola que tal").join("")
}

const str = generateString()

app.get("/saludogzip", gzipMiddleware,  (req,res) => {
    res.send(str)
})
```
For the `1-gzip` example, without compression, the request size was 12.2KB, with compression it was 375 B

# Loggers
* Cuando llevamos un sistema a producción, uno de los elementos más importantes a la hora de detectar cualquier problema o anomalía son los logs.
* Cuando hay muchas peticiones concurrentes, los *logs* de todas ellas se mezclan haciendo imposible su seguimiento salvo que tengan un *identificador único*.

📝 Un log o historial de log refiere al registro secuencial de cada uno de los eventos que afectan un proceso particular constituyendo una evidencia del comportamiento del sistema.
* Los loggers son librerías para facilitar la impresión de un identificador único.
* Tienen la ventaja de que no necesitamos usar console.log para el registro de sucesos en el servidor, lo cual es más eficiente y permiten clasificar los mensajes por niveles de debug y enviarlos a distintos medios: file, database, email, consola, etc.

# Log4js
* Es una de las librerías de loggers más utilizada. Aunque actualmente está siendo reemplazada por Winston y luego por Pino, que es hoy el más moderno.
* appenders se refiere a donde se van a guardar los logs y categories
* Las categorias son jerarquicas, de la de menor peso a la de mayor son:
   * trace
   * debug
   * info
   * warn
   * error
   * fatal


1. `npm i log4js`

2. logger_config.js
```
const log4js = require("log4js")

log4js.configure({
    appenders: {
        console: {type: "console"},
        errorFile: { type: "file", filename: "error.log" },
        debugFile: { type: "file", filename: "debug.log" },
    }, 
    categories: {
        default: {
            appenders: ["console"],
            level: "info"
        },
        productionLogger : {
            appenders: ["debugFile", "errorFile"],
            level: "debug"
        },
        debug: {
            appenders: ["debugFile"],
            level: "debug"
        },
        error: {
            appenders: ["errorFile"],
            level: "error"
        }
    }
})
```

3. index.js
```

const log4js = require("log4js")
require("./logger_config")
const logger = NODE_ENV === "production" ? log4js.getLogger("productionLogger") : log4js.getLogger()

app.get("*", (req,res) => {
    const msg = `Route not found ${req.url}`
    logger.warn(msg)
    res.status(404).send(msg)
    return
})
```


# Winston

* Transports es el simil de appenders en log4js

* Levels: 
  * error: 0,
  * warn: 1,
  * info: 2,
  * http: 3,
  * verbose: 4,
  * debug: 5,
  * silly: 6


Steps:
1. logger_config.js 

```
const winston = require("winston")

const loggerDev = winston.createLogger({
    level: "info", //console
    transports: [
        new winston.transports.Console({level: "info"})
    ]
})

const loggerProd = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.File({
            "filename": "debug.log",
            level: "debug"
        }),
        new winston.transports.File({
            filename: "error.log",
            level: "error"
        })
    ]
})

module.exports = {
    loggerDev,
    loggerProd
}
````

2. index.js
```
const {loggerDev, loggerProd} = require("./logger_config")
const logger = NODE_ENV === "production" ? loggerProd : loggerDev


logger.log("error", `Something went wrong:`)
```

# Pino

Pino levels: 
* fatal
* error
* warn
* info
* debug
* trace
* silent