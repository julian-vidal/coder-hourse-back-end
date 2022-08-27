// https://docs.google.com/presentation/d/1QDLdL-7nAQSUdg46R0rib1v_tRU-mJNpc-CJViCFJ-s/edit#slide=id.gfc4fab51f5_1_17

use empresa;

db.createCollection("clients");

show collections;

db.clients.insertMany([
    {name: "Julian" , age: NumberInt(25)},
    {name: "Jeniffer" , age: NumberInt(29) },
    {name: "Juan" , age: NumberInt(18)}
])

db.clients.find({})


db.products.insertMany([
    {name: "Shirt" , price: NumberInt(12), stock:NumberInt(12) },
    {name: "Pant" , price: NumberInt(13), stock:NumberInt(13) },
    {name: "Shoes" , price: NumberInt(14), stock:NumberInt(14) }
])


db.products.find({})


// Filtros
db.clients.find({age: {$lte: 25}})

db.clients.find({age: {$in: [18,19,29]}});


db.clients.find({age: {$gte: 25}, name: {$regex: "a"} }) //AND implicito

db.clients.find({
    $or : [
        {age: {$lt: 25}},
        {name: {$regex: "e"}}
    ]
})

db.clients.findOne({age: {$gt: 20}}) // Retorna el primer documento (en orden de registro) que cumple la condición


db.clients.find({email: {$exists: true}}) // Retorna los docs que tiene la key email


// Proyecciones: 
db.clients.find({age: {$gt:20}}, {name:1})



// Update
// By ID
db.clients.updateOne(
    {_id: ObjectId("6309510768460a0b933d08eb")},
    {$set: {age:NumberInt(16)}}
)


// By criteria
db.clients.updateMany(
    {age: {$gte: 18}},
    {$set: {adult: true}}
)

db.clients.updateMany(
    {age: {$lt: 18}},
    {$set: {adult: false}}
)


db.clients.updateMany(
    {},
    {$set: {created: new ISODate()}}
)

// Delete a key
db.clients.updateMany(
    {},
    {
        $unset: {created: 1}
    }
)

// Delete a record
db.clients.deleteOne({age:16})



db.clients.insertOne(
    {name: "Julian" , age: NumberInt(25)}
)

db.clients.deleteOne({"_id": ObjectId("630a4a0e9b4d64aabee5ef64")})

