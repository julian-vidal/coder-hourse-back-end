# Logging with Google

1. Create a project in GCP, set up the "OAuth consent screen" include the scopes added to the project and a "OAuth 2.0 Client IDs" at the credentials tab and download the JSON file
2. `npm i passport-google-oauth20 -S`
3. qw


# JSON WEB TOKEN
A string is codified in 3 parts: header, playload, and verify signature

* JSON Web Token es un método estándar y abierto para representar reclamaciones de forma segura entre dos partes.
* JWT.IO nos permite decodificar, verificar y generar JWT.
* Básicamente, los JWT son cadenas de datos que se pueden utilizar para autenticar e intercambiar información entre un servidor y un cliente.

Con JWT no es necesario crear sesiones (express-session)! 

Es un proceso aisalado de la autenticacion
## Process:
1. El cliente envía credenciales al servidor.
2. El servidor verifica las credenciales, genera un JWT y lo envía como respuesta.
3. Las solicitudes posteriores del cliente tienen un JWT en los headers de la solicitud.
4. El servidor valida el token:
   * Si es válido, proporciona la respuesta solicitada.
   * Si no se valida el token, se niega el acceso.

## Install
1. `npm i jsonwebtoken`