// Create and select the DB "ecommerce"
use ecommerce

// Add 10 records to the "products" collection
db.products.insertMany([
    {name: "Shirt", image:"https://placehold.jp/500x500.png", price: 30},
    {name: "Pant", image:"https://placehold.jp/400x400.png", price: 10},
    {name: "Shoes", image:"https://placehold.jp/300x300.png", price: 20},
    {name: "Skirt", image:"https://placehold.jp/300x350.png", price: 45},
    {name: "Sweater", image:"https://placehold.jp/100x300.png", price: 250},
    {name: "Cap", image:"https://placehold.jp/200x300.png", price: 100},
    {name: "Jersey", image:"https://placehold.jp/350x300.png", price: 300},
    {name: "Scarf", image:"https://placehold.jp/320x300.png", price: 500},
    {name: "Pijama", image:"https://placehold.jp/100x300.png", price: 400},
    {name: "Socks", image:"https://placehold.jp/200x300.png", price: 345},
])

// Add 10 records to the "chats" collection
db.chats.insertMany([
    {email: "1@test.com", message: "Test 1", date: new Date()},
    {email: "2@test.com", message: "Test 2", date: new Date()},
    {email: "3@test.com", message: "Test 3", date: new Date()},
    {email: "4@test.com", message: "Test 4", date: new Date()},
    {email: "5@test.com", message: "Test 5", date: new Date()},
    {email: "6@test.com", message: "Test 6", date: new Date()},
    {email: "7@test.com", message: "Test 7", date: new Date()},
    {email: "8@test.com", message: "Test 8", date: new Date()},
    {email: "9@test.com", message: "Test 9", date: new Date()},
    {email: "10@test.com", message: "Test 10", date: new Date()},
])

// List all documents of the "products" collection
db.products.find({})

// List all documents of the "chats" collection
db.chats.find({})

// Count records at the "products" collection
db.products.find({}).count()

// Count records at the "chats" collection
db.chats.find({}).count()

// Add one more product to the "products" collection
db.products.insertOne({name: "Underwear", image:"https://placehold.jp/201x350.png", price: 35})

//Products with price < 100
db.products.find({price: {$lt: 100}})


// Products with price > 100 and price < 300
db.products.find( {
    $and : [
        {price: {$gt: 100}}, 
        {price: {$lt: 300}}    
    ]
})

// Products with price greater than 300
db.products.find({ price: {$gt: 300} })

// List the 3rd cheaper product and only show the name
db.products.find({}, {name: 1}).sort({price: 1}).skip(2).limit(1)

// Add the key "stock" and set it to 100 for all products 
db.products.updateMany(
    {},
    {$set: {stock: NumberInt(100)}}
)


// Set stock = 0 for products with price > 400
db.products.updateMany(
    {price: {$gt: 400}},
    {$set: {stock: NumberInt(0)}}
)

// Delete products with products < 100
db.products.deleteMany(
    {price: {$lt: 100}}
)


