 const express = require('express');
 const pug = require('pug');
 const app = express();

 app.set('view engine', 'pug'); // Set Pug JS as template engine
 app.set('views', './views'); //Set "views" as the template directory


//  app.use(express.json());
// app.use(express.urlencoded({extended:true}))

 app.get('/', (req,res) => {
    res.render('index', {
        title: 'CoderHouse App',
        message: 'This is a message!!!'
    })
 })

 app.get('/hello', (req,res) => {
    res.render('hello', {
        message: 'Super message',
        fName: 'Julian',
        lName: 'Vidal'
    })
 })

app.get('/data', (req,res) => {
    const {min,level,max,title} = req.query;
    res.render('data', {
        min,
        level,
        max,
        title
    })
})
 
 const PORT = process.env.PORT || 8080;
 
 app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
 })