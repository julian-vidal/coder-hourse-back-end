const mongoose = require("mongoose");

const dbConnection = async () => {
    // mongodb://<user>:<password>@localhost:<port>/<db> // No se necesita si se conecta con root
    const URIString = "mongodb://localhost:27017/school"
    await mongoose.connect(URIString)
}

module.exports = dbConnection;
