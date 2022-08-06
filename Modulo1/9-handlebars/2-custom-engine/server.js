const fs = require('fs');
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const PORT = 8080;

const app = express();


app.engine("cte", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if(err) callback(new Error(err));

        let rendered = content.toString();

        Object.keys(options).forEach(key => {
            const value = options[key];
            rendered = rendered
        })
        
    })
})

app.set('views', './views')
app.set('view engine', 'cte')

app.get('/cte1', (req,res) => {
    const options = {titulo: "Algo", mensaje: "Mensaje", autor: "Fulano"}
})

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`)
})

