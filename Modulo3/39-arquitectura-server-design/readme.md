# BUENAS PRÁCTICAS EN EL DESARROLLO DE SERVIDORES NODE

**Adoptar un enfoque por capas:**
* **Controlador:** Rutas de API y endpoints.
* **Capa de servicios:** para la lógica de negocio.
* **Capa de acceso de datos:** para trabajar con la base de datos.
   
[Here's](https://docs.google.com/presentation/d/1a7RJ6QRxWMW7zOQAENWiVtPSyJPtcOl1T_jzEQ5iP4E/edit#slide=id.gf792494914_0_3904) an example of the structure


**Modelos de editor/suscriptor**
* Es un patrón de intercambio de datos popular en el que hay dos entidades comunicantes: editores y suscriptores. 
* Los **editores** envían mensajes a través de canales específicos sin ningún conocimiento de las entidades receptoras. 
* Los **suscriptores** (receptores de mensajes), por otro lado, expresan interés en uno o más de estos canales sin ningún conocimiento sobre las entidades editoriales.
* Es una buena idea incorporar un modelo de este tipo en nuestro proyecto para administrar varias operaciones secundarias correspondientes a una sola acción.


Watched until 52

# How to run the script

Generate a JWT: GET request to http://localhost:8080/misc/generateToken

# Patron MVC
MVC, es un patrón arquitectónico que separa una aplicación en tres componentes lógicos principales:
- **Controlador:** Es la parte que se encarga del procesamiento de la solicitud del cliente que maneja esta solicitud y devuelve una respuesta. Ejm: Capa re routeo, servicios, etc.
- **Modelo:** Es responsable del dominio de datos de la aplicación. Los objetos de modelo son responsables de almacenar, recuperar y actualizar datos de la base de datos. Ejm: 
- **Vista:** es el que compila y renderiza en HTML simple. Es la interfaz de usuario de nuestra aplicación. Es la forma en que el usuario obtiene la respuesta de lo que solicitó.


## HTML ON WIRE (es lo mismo que SSR?)
* HTML on wire  genera las vistas en el backend, por ejemplo, con un motor de plantillas con Pug.
* De esta forma, no se tiene una API REST por un lado y un frontend por el otro, sino que dentro de un mismo proyecto tenemos toda la aplicación, solo en backend, incluídas las vistas.
* Estas vistas, son renderizadas en el controlador, como respuesta a las solicitudes que realiza el usuario de la aplicación.

## DATA ON WIRE
* La diferencia con HTML on wire, es que en este caso, las vistas se realizan por separado, en un frontend, que puede ser realizado por ejemplo con React.
* Entonces, lo que devuelve el backend, desde el controlador, es un json, en lugar de un HTML.
* En el backend, seguimos teniendo las rutas, modelos y controladores. Lo único que cambia es la forma en que llega a los usuarios la respuesta de sus solicitudes.

# Patrones de diseño
Resource: https://refactoring.guru/

* Los patrones de diseño son una forma de estructurar el código de nuestra solución, de manera que nos permita obtener algún tipo de beneficio, como velocidad de desarrollo más rápida, reutilización de código, etc.
* Son una solución general y reutilizable para un problema común.
* No es obligatorio utilizar los patrones de diseño. Solo es aconsejable en el caso de tener el mismo problema o similar, siempre teniendo en cuenta que en un caso particular puede no ser aplicable.

## IIFE (ya no se usa! Hay top-level await y clases con campos privados (con #))
* IIFE significa Expresiones de función inmediatamente invocadas. Nos permite definir y llamar a una función al mismo tiempo.
* Debido a la forma en que funcionan los ámbitos de JavaScript, el uso de IIFE puede ser excelente para simular cosas como propiedades privadas en clases. De hecho, este patrón en particular se usa a veces como parte de los requisitos de otros más complejos. 

## Singleton
* Es un patrón bastante simple pero nos ayuda a realizar un seguimiento de cuántas instancias de una clase estamos instanciando. De hecho, nos ayuda a mantener ese número en uno solo, todo el tiempo. 
* Básicamente, el patrón Singleton nos permite crear una instancia de un objeto una vez y luego usarlo cada vez que lo necesite, en lugar de crear uno nuevo sin tener que realizar un seguimiento de una referencia a este, ya sea globalmente o simplemente pasándolo como un dependencia en todas partes.
