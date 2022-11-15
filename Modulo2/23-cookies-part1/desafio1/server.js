const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

// app.use(cookieParser("m4&L5X6iC&h4")); //This is a key secret to encode/decode cookies. If it changes, the generated cookies won't be valid
app.use(cookieParser(["m4&L5X6iC&h4", "cv@0VwD9B7#8", "#2OV8wjH79l@" ])); //This is a key secret to encode/decode cookies. If it changes, the generated cookies won't be valid
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("/public"))


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/cookie", (req,res) => {
    const signed = req.query.signed === "true"; // para cookies firmadas
    const cookies = signed ? req.signedCookies : req.cookies
    res.json({
        cookies,
        type: signed ? "signed" : "unsigned"
    })
})

app.post("/cookie", (req,res) => {
    const key = req.body.key;
    const value = req.body.value;
    const exp = Number(req.body.exp);
    const signed = req.body.signed === true;
    if (!key || !value) {
        return res.status(400).json({error: "Parameters are missing"})
    }

    res
        .cookie(key, value, {signed, maxAge: exp ? exp : null})
        .json({key:value})
})


app.delete("/cookie/:key", (req,res) => {
    const key = req.params.key;
    const exist = key in req.cookies || key in req.signedCookies;

    if (!exist) {
        return res.status(400).json({
            error: "La cookie no existe"
        })
        
    }

    res.clearCookie(key).json({deleted:ok})
})

app.listen(8000, (req,res) => {
    console.log(`Server running at port 8000`)
})