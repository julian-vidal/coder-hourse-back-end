Poner en marcha el servidor de base de datos Redis y conectar su cliente CLI.

Realizar las siguientes tareas:
1. Listar la información total en la base.
`redis-cli`
`INFO MEMORY`

2. Crear 5 claves sin tiempo de expiración que contengan nombres de productos.
`SET product1 "Pant"`
`SET product2 "Shirt"`
`SET product3 "Skirt"`
`SET product4 "Shoes"`
`SET product5 "Sock"`

3. Listar nuevamente toda la información.
`INFO MEMORY`

4. Mostrar el contenido de cada una de las claves de productos.
`GET product1`
`GET product2`
`GET product3`
`GET product4`
`GET product5`

5. Agregar un producto más, fijando un tiempo de vida de 30 segundos.
`SET product6 "Sweater" EX 30`
6. Listar el nuevo producto y su tiempo de expiración.
`GET product6`
`TTL product6`

7. Verificar que al transcurrir ese tiempo, el producto desaparezca del listado general.
