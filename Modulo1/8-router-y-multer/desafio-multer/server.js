const express = require("express");
const {Router} = express;
const app = express();
const PORT = 8080;
const multer = require("multer");

// app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use(express.static("public"))
// app.use("/public", express.static(__dirname + "/public"))

// Return a file instead of text or JSON
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})


// Set Storage
let storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, 'uploads')
    },
    filename: function(req,file,cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

let upload = multer ({
    storage: storage
})

// Middleware que revisa que se haya enviado un archivo desde el form con un input name myFile
app.post("/uploadFile", upload.single('myFile'), (req,res,next) => {
    const file= req.file;
    if(!file) {
        const err = new Error('Please upload a file');
        err.httpStatusCode = 400;
        return next(err);
    }
    res.send(file)
})

app.post("/uploadmultiple", upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files;
    if(!files) {
        const err = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(err)
    }
    res.send(files)
})

// Iniciar server
const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})

server.on("error", err => console.log())