# Autenticación
* Es el proceso de identificación de usuarios para asegurarse su identidad.
* Existen diversos métodos para probar la autenticación, siendo la contraseña el más conocido y utilizado.
* Parte del principio de que si el usuario dispone de las credenciales requeridas (por ejemplo, nombre de usuario y contraseña), el sistema puede validar la identidad del usuario y permitir el acceso a los recursos solicitados.

# Autorización
* Define la información, los servicios y recursos del sistema a los que podrá acceder el usuario autenticado.
* Uno de sus usos más comunes es para generar distintos permisos para el usuario común y el administrador, quienes tendrán acceso a distintos tipo de recursos.
* Existen distintos métodos para autorizar usuarios.
  * Suele utilizarse el método mediante middlewares, donde permitan el acceso según el tipo de usuario autenticado (admin, cliente, etc.).

En resumen, La **autenticación** verifica las identidades, por diferentes métodos (algo que sabemos, algo que tenemos, algo que somos) y la **autorización** verifica los permisos que corresponden a cada identidad. Por lo general primiero se hace la autenticación y luego la autorización

# Métodos de autenticación
* **Usuario y contraseña:** Es el método tradicional más utilizado, donde el usuario ingresa username o email y password para autenticarse.
* **Sin contraseña (passwordless):** Consiste en que, cada vez que queramos iniciar sesión a un recurso, se nos enviará al email un enlace que nos permitirá acceder sin necesidad de contraseña.
* **Por redes sociales:** Varias aplicaciones nos dan como opción iniciar sesión directamente con alguna red social. La ventaja principal es que se usan directamente los datos de esa cuenta social para hacer el inicio de sesión.
* **Datos biométricos:** Autentica usuarios mediante huellas dactilares.

* **JWT(JSON Web Token):** Este método open source permite la transmisión segura de datos entre las distintas partes. Comúnmente se utiliza para la autorización a partir de un par de claves que contiene una clave privada y una pública. 
* **OAuth 2.0:** Permite que mediante una API, el usuario se autentique y acceda a los recursos del sistema que necesita.

# Passport
* Passport es un middleware de autenticación de NodeJS.
* Cumple únicamente la función de autenticar solicitudes, por lo que delega todas las demás funciones a la aplicación. Esto mantiene el código limpio y fácil de mantener.
* Passport reconoce los distintos métodos de login utilizados actualmente, por lo que sus mecanismos de autenticación se empaquetan como módulos individuales. Entonces, no es necesario crear dependencias que no se vayan a utilizar.
* Cada uno de estos mecanismos se llaman strategies.


* Cada strategy tiene un módulo distinto de NodeJS para instalar.
* Las strategy disponibles son:
  * passport-local para autenticación de usuarios mediante nombre de usuario y contraseña.
  * passport-openid para autenticación mediante OpenId (estándar abierto para la autenticación federada).
  * passport-oauth para autenticación mediante API de otros proveedores como de redes sociales.


## Passport local
1h:32
1. `npm i passport passport-local`
2. Requerimos `passport` y el modulo `Strategy` de `passport-local`:
```
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
```
3.
