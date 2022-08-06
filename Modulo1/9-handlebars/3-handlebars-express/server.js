const express = require("express");
const handlebars = require("express-handlebars")

const app = express();
const PORT = 8080;


const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials"
})

app.engine("hbs", hbs.engine);
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("main", {

    })
})




app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})