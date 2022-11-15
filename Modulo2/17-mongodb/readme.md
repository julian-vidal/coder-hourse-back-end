# Notes
* MongoDb es una DB no relacional (NoSQL), orientada a documentos que ofrece una gran escalabilidad.

* El modelo de doc es facil de usar y proporciona funcionalidades para satisfacer los requisitos más complejos a cualquier escala.

* Se puede tener de forma local con Mongo Server o Remota con Mogo Atlas

## Caracteristicas

* Almacena datos en documentos flexibles similares a JSON: la estructura de datos puede cambiarse con el tiempo.
* El modelo de documento se asigna a los objetos en el código de su aplicación para facilitar el trabajo con los datos => Es facil hacer una migracion de Mongo a SQL.
* Las consultas ad hoc, la indexación y la agregación en tiempo real ofrecen maneras potentes de acceder a los datos y analizarlos.
* MongoDB es una base de datos distribuida en su núcleo, por lo que la alta disponibilidad, la escalabilidad horizontal y la distribución geográfica están integradas y son fáciles de usar.
* MongoDB es de uso gratuito.


## Esquemas
* Se componen por registros, similiares a objetos de JS.
* Arquitecturra: Server > Databases > Colections > Docs
* Una colección en MongoDB es muy similar a una tabla de una bd. La tabla almacena registros (filas) mientras que las colecciones almacenan documentos.
* El conpecto de fila y de documentos son bastantes diferentes es SQL y NoSQL:
  * Una fila está compuesta por columnas y siempre son las mismas para todas ellas
  * En cambio un documento está compuesto por claves y valores (key,value) y cada doc puede tener variaciones importantes con respecto al anterior dentro de una colección.
* NoSQL se denomina *Schema Free*, lo que permite que diferentes documentos dentro de una coleccion tengan diferentes pares key,value.
* Tambien permite tener documentos embebidos: un doc dentro de otro doc y que ambos están ligados a la misma colección.

# Install and setup
Details [here](https://www.mongodb.com/docs/v6.0/tutorial/install-mongodb-on-os-x/) -> Make sure to install the newest version
1. `brew tap mongodb/brew`
2. `brew update`
3. `brew install mongodb-community`
4. `brew services start mongodb-community`
5. `mongod --dbpath="<path-here>"`

## Useful commands
1. `mongosh` -> starts the server
2. `show databases` or `show dbs` -> By default, Mongo creates 4 dbs: test, admin, config, local
3. `db` -> Shows the current db
4. `use <dbname>` -> creates and selects a db
5. `db.usuarios.insert({nombre: "Julian"})` o `db.usuarios.insertOne({nombre: "Jeni"})` o `db.usuarios.insertMany([{},{},{}])` -> creates a collection and inserts data.
6. `db.usuarios.find()` -> Shows all docs within the collection *usuarios*.
7. `show collections`

# MySQL vs MongoDB
* MongoDB es mas flexible que MySQL ya que es mas facial agregar nueva data 
## Ventajas MySQL
* Podemos ejecutar sentencias SQL directamente en nuestra base de datos.
* Posibilidad de abstracción de nuestra base de datos con algún ORM estilo Doctrine o Hibernate.
* Almacenamiento de datos totalmente organizado y jerarquizado con claves primarias y foráneas.
* Nos permite evitar la duplicidad de registros.
* Mejora notable en mantenimiento de datos en relación a la seguridad requerida de los mismos.
## Desventajas MySQL
* Si nuestro sistema escala y evoluciona, tendremos que haber diseñado nuestra base de datos según los posibles nuevos requerimientos.
* Requiere más espacio de almacenamiento que una base NoSQL.
* Las transacciones de datos son más pesadas frente a las bases de datos NoSQL.
* Los límites en los campos de las tablas nos pueden hacer perder datos si no los configuramos adecuadamente según el tamaño del dato que nos puedan introducir los usuarios.

## Ventajas MongoDb
* La escalabilidad y su carácter descentralizado hacen que soporte estructuras distribuidas.
* Permiten realizar sistemas más abiertos y flexibles debido a su fácil adaptación de nuevas evoluciones de nuestras aplicaciones web.
* No se requieren potentes recursos para poder trabajar con bases de datos NoSQL.
* Optimización de las consultas en base de datos para grandes cantidades de datos almacenados.


## Desventajas de MongoDb
* Problemas con sentencias SQL ya que no admiten el 100% de las consultas existentes.
* No es capaz de realizar transacciones. Si bien en nuestra web o en una aplicación que hemos desarrollado podemos simular una transacción, MongoDB no tiene esa opción entre sus tantas capacidades. (transacción = fragmento de código que se ejecuta al pie de la letra, si en algún paso hay un error, ella puede revertir los cambios de las tablas afectadas)
* La principal desventaja de MongoDB es que carece de algo tan fundamental como los Joins. (Cotejar tablas usando IDs)
* Falta de estandarización entre las diferentes bases de datos NoSQL.



Entregable
1. `use mibase`

2. ```
db.usuarios.insertMany([
  {nombre: "Julian", apellido: "Vidal", edad: 25},
  {nombre: "Jeniffer", apellido: "Reyes", edad: 29},
  {nombre: "Juan", apellido: "Vidal", edad: 18}])
```
3. `db.usuarios.find()`

