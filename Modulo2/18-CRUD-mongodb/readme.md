Visto hasta min 41

# Filtros
Offical doc [here](https://www.mongodb.com/docs/manual/reference/operator/query/)

## Filtros numéricos
se usa con `db.collection.find({key: {$operator: val}})`. Los operadores son:
- `gt` = greater than
- `gte` = greater than or equal
- `lt` = less than
- `lte` = less than or equal
- `ne` = not equal
- `in` = para numeros igual a alguno de los valores en el array: `db.collection.find({"year": {$in: [1958, 1959]}})`
- `nin` = para numeros no iguales a alguno de los valores en el array


# Proyecciones
Para retornar solo ciertos valores de los documentos.

- `db.clients.find({age: {$gt:20}}, {name:1})` => Solo retorna el nombre de los documentos con age mayor a 20.
- - `db.clients.find({age: {$gt:20}}, {name:0})` => Retorna todos los fields menos el nombre de los documentos con age mayor a 20.