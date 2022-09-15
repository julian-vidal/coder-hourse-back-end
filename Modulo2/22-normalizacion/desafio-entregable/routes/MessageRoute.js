const {Router} = require("express");
const {getAllMessages} = require ("../controllers/MessageController")

const routerMessages = Router();

routerMessages.get("/", getAllMessages);

module.exports = routerMessages