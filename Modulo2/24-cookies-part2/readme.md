# SESSION MEMORYSTORE
* Cuando nos manejamos con session-memory, de forma predeterminada estaremos utilizando el almacenamiento en memoria: el memoryStore.
* Al reiniciar el servidor, estos datos se borran, de modo que no tienen persistencia. Por eso, memoryStore solo está disponible en desarrollo (nunca en producción).

>> Para superar esta limitación utilizaremos Session FileStore.

# SESSION FILESTORE
* Se utiliza igual que memoryStore, con la diferencia de que se crea una carpeta de archivos en donde se almacenan los datos de session.
* Estos tendrán persistencia, ya que quedarán guardados en el servidor.

## Install and setup fileStore
1. `npm i -S session-file-store`
2. Import it

```
const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const FileStore = require("session-file-store")(session)
```
3. Use it

```
const app = express();
app.use(cookieParser())
app.use(session({
    store: new FileStore({path: "../sessions", ttl: 300, retries:0})
    secret: "Z6IIZO17n7aFqYShXYsY",
    resave: false,
    saveUninitialized: false
}))
```

ttl: max time of a session, in seconds

# Session REDIS y REDISLAB
* Es un servidor de diccionarios remoto (*Remote Dictionary Server*).
* Almacén de datos clave-valor en memoria de código abierto que se puede utilizar como base de datos, caché y agente de mensajes.


## Características
* Los datos de Redis se almacenan en **memoria** del servidor, por lo que el acceso a los mismos es muy rápido.
* Tiene mucha flexibilidad en cuanto a las estructuras de datos que admite (strings, listas, hashes, sets, entre otros). De esta forma, el código queda mucho más simple y con menos líneas.
* Por persistencia, Redis admite copias de seguridad puntuales (guarda el conjunto de datos en el disco).
* Crea soluciones con un alto nivel de disponibilidad, lo que ofrece fiabilidad y rendimiento estables.

## Comando Keys
* Las Redis Keys son binarias y seguras. Esto significa que puede usar cualquier secuencia binaria como clave, ya sea un string o un archivo de imagen.
* El tipo más usado y recomendado por su mayor simpleza es un string como Redis Keys.
* Con el uso de los comandos SET y GET configuramos y recuperamos un valor de un string.

### SET key value
* Es el comando con el que se pueden setear nuevos key value.
* Se le puede especificar un tiempo de expiración en segundos o milisegundos.
* Da como respuesta “OK” si el comando SET se ejecutó correctamente y, si hubo algún problema, devuelve “Null”.
`SET mykey "Hello"`
`SET mykey2 "Hello2" EX 60` // willexpire in 1 min

### GET key value
* Es el comando con el que se puede leer el valor de la key.
* Devuelve un error si el valor de la key es distinto de un string.
* Si se ejecuta correctamente devuelve el valor de la key. Si esta no existe, devuelve la palabra reservada nil.

## Comando TTL
* Devuelve el tiempo de vida que le queda a la key, si es que tiene seteado un timeout.
* Permite al cliente chequear por cuánto tiempo más esa key va a ser parte del conjunto de datos.
* Devuelve -2 si la key no existe o -1 no tiene un tiempo de expiración.
* Para agregarle un TTL a una key existente: `EXPIRE mykey 10`

# Redis and Node
1. `npm i redis connect-redis -S`

2. 
```
const express = require("express")
const session = require("express-session")
const redis = require("redis")
const client = redis.createClient({
    legacyMode: true,
    url: 'redis://<username>:<password>@<host>:<port>' // if this isn't included, it'll connect to localhost 
})
client.connect().catch(console.log)
const RedisStore = require("connect-redis")(session)

```


3. asd
```
const app = express();
app.use(cookieParser())
app.use(session({
    store: new RedisStore({
        client,
        ttl:60,
        retries:0
    }),
    secret: "1q6TuxpoFypUUdoP4eWZ",
    resave:false,
    saveUninitialized: false
}))
```

# Redis Labs
* RedisLab es lo mismo que Redis, pero los datos se guardan en la nube.
* Entrando a su página oficial, se crea una cuenta para poder empezar a utilizarlo: https://redislabs.com/

# redis-cli
* Redis-cli es la interfaz de línea de comandos de Redis, un programa simple que permite enviar comandos a Redis y leer las respuestas enviadas por el servidor, directamente desde la terminal.
* Para empezar a usarlo seguir los siguientes pasos de comandos en consola:
  * `redis-cli`  para conectar el servidor local.
  * `redis-cli -h host -p port -a password`  para conectar con el servidor remoto.


`KEYS *` -> returns all keys


# Session Mongo y Mongo Atlas
Mediante el paquete de Node llamado **connect-mongo** se puede utilizar la base de datos de MongoDB para persistir los datos almacenados en Session.

## Install and setup
1. `npm i connect-mongo -S`

# Links
https://redis.io/docs/reference/patterns/twitter-clone/
https://redis.io/commands/


redis-cli -h redis-10073.c8.us-east-1-3.ec2.cloud.redislabs.com:10073 -a 6qc7KBDXUF4Om6rZAWs2gPEg36Vb7Tdj

