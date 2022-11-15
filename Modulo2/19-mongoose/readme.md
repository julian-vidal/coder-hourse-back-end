# Notes

- Mongoose es una dependencia Javascript que realiza la conexión a la instancia de MongoDB
- Pero la magia real del módulo Mongoose es la habilidad para definir un esquema del documento. 
- MongoDB usa colecciones para almacenar múltiples documentos, los cuales no necesitan tener la misma estructura.
- Cuando tratamos con objetos es necesario que los documentos sean algo parecido. En este punto nos ayudan los esquemas y modelos de Mongoose.


- En Mongoose, modelo = collection.
- Buffer es una serie de bites que sirve para guardar datos en binario, generalmente para almacenar imagenes.
- Mongoose usa un **objeto Schema** para definir una lista de **propiedades del documento**, cada una con su propio tipo y características para forzar la estructura del documento. 
- Después de especificar un esquema deberemos definir un **Modelo constructor** para así poder crear instancias de los documentos de MongoDB


# Install and setup
1. `npm init -y`
2. `npm i mongoose`


Watched until 1:16:00