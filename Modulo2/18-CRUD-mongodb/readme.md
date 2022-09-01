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


# Usuarios

Official doc:
- [Built-in Roles](https://www.mongodb.com/docs/manual/reference/built-in-roles/)
- [Manage Users and Roles](https://www.mongodb.com/docs/manual/tutorial/manage-users-and-roles/)
- [User Management Commands](https://www.mongodb.com/docs/v6.0/reference/command/nav-user-management/)

## Create a user
```
db.runCommand({
    createUser: "<username>",
    pwd: "<password>", // or passwordPrompt()
    roles: [
        {role: "readWrite", db: "<db_name>"}
    ]
})
```

## Connect to MongoDB with an user

`mongosh -u <username> -p "<password>" --authenticationDatabase "<DB name>"`

## Delete a user
```
db.runCommand({
    dropUser: "<username>"
})
```

## Check current user
`db.runCommand({connectionStatus : 1})`
