# Cookies
Las Cookies son archivos que podemos guardar del lado del **cliente**, en el navegador del usuario.

## Caracteristicas
* A las cookies se les puede configurar un **tiempo de vida**. Una vez finalizado el mismo, la cookie se elimina del navegador.
* Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecuada lo que se vaya a guardar como cookie.
* Hay que recordar que no se deben almacenar datos sensibles en las cookies.

## Install and setup

1. `npm i cookie-parser --save`

```
const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())


// create a cookir
app.get('/set', (req,res) => {
    res.cookie('server', 'express').send('Cookie Set')
})

app.get('/setEX', (req,res) => {
res.cookie('server2','express2', {maxAge: 30000} ).send('Cookie Set')

})

//res.cookie(<key>, <value>, {maxAge: <expiryTimeInSeconds>}).send("cookie set")


// read a cookie
app.get('/get', (req,res) => {
    res.send(req.cookies.server)
}

// delete a cookie

app.get("/clr", (req, res) => {
    res.clearCookie("server").send("Cookie Clear")
})

```

## Signed Cookies
Es un mecanismo de validación para evitar que terceros lean/editen/borren cookies (mann-in-the-middle)

### Características
* A las cookies se les puede agregar un mecanismo de validación que consiste en adjuntar a cada cookie una versión encriptada de su contenido. 
* Dicha encriptación se realiza mediante una palabra clave o “secreto” definido del lado del servidor, y desconocido por los clientes. 
( El servidor es capaz de verificar si la cookie que se recibe desde el cliente ha sido adulterada o no, chequeando contra la versión encriptada.

### cookieParser(secret)
**Secret:** string o array de strings que se utiliza para firmar las cookies enviadas, y para analizar las recibidas.
* Es opcional y, si no se especifica, no firmará ni analizará las cookies recibidas. 
* Si es un string, se utiliza como secret. Si es un array de strings, se firmará la cookie con cada string en el orden provisto (y lo mismo al analizar).

#### Crear una cookie firmada
* Para firmar una cookie antes de enviarla al cliente, solo basta con agregar a los dos argumentos usuales (nombre y valor), un tercer argumento de tipo objeto (como se hizo para setear la expiración) con la propiedad “signed” en *true*. `{ signed: true }`
* Las cookies firmadas recibidas, que hayan pasado la verificación de su firma, ya no se encontrarán en *req.cookies*, sino que aparecerán en **req.signedCookies**. Aquellas que no hayan pasado la verificación, no aparecerán, como si no existieran.


# Session
Session es un paquete de Node, el cual permite que una variable sea accesible desde cualquier lugar del sitio. Se almacena del lado del servidor.

**IMPORTANT NOTE:** When the client makes a login request to the server, the server will create a session and store it on the server-side. When the server responds to the client, it sends a cookie. This cookie will contain the session’s unique id stored on the server, which will now be stored on the client. This cookie will be sent on every request to the server.

We use this session ID and look up the session saved in the database or the session store to maintain a one-to-one match between a session and a cookie. This will make HTTP protocol connections stateful.


## Caracteristicas
* La información que se quiera guardar en **session** se almacena del lado del servidor.
* Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
* Los datos almacenados en session se borran al cerrar la ventana del navegador.
* Se utiliza principalmente para guardar los datos de usuario al iniciar sesión.



## Install and setup
1. `npm i express-session --save`

2. Es un middleware que se requiere a nivel de app
```
const express = require("express")
const session = require("express-session")
const app = expres()

const PORT = process.env.port || 3000

app.use(session({
    secret: "cv@0VwD9B7#8",
    resave: true,
    saveUnintializaed: true
}))
```

3. Guardar datos en session

```
app.get("/con-sesion", (req,res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`You have visitied the site ${req.session.contador} veces.`)
    } else {
        req.session.contador = 1
        res.send("Welcome")
    }
})
```


4. **Delete data of a session**. The whole session needs to be deleted!z
```
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(!err) res.send("Logout ok!")
        else res.send({status: "Logout ERROR", body: err})
    })
})
```

5. **Login con session**. En apps reales, se compara el hash de los passwords, no el password mismo

```
app.get("/login", (req, res) => {
    const {username, password} = req.query
    if(username !== "pepe" || password !== "pepepass) {
        return res.send("login failed")
    }
    req.session.user = username
    req.session.admin = true
    res.send("login success!")
})
```

6. Middleware de autenticación

```
const auth = (req,res,next) => {
    if(req.session?.user === "pepe" && req.session?.admin) {
        return next()
    }

    return res.status(401).send("Error de autorización!")
}

app.get("/privado", auth, (req,res) => {
    res.send("Si estás viendo esto es porque ya iniciaste sesión")
})
```
