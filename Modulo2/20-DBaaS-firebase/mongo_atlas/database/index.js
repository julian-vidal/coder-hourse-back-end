
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://antonoio:password1234@cluster0.jw4srfl.mongodb.net/test";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



const mongoose = require("mongoose");

async function connection() {
  // mongodb://user:password@host:port/db
  // const URIString = "mongodb://localhost:27017/plataforma";
  const URIString = "mongodb+srv://antonio:password1234@cluster0.jw4srfl.mongodb.net/plataforma?retryWrites=true&w=majority";
  await mongoose.connect(URIString);
}

module.exports = connection;