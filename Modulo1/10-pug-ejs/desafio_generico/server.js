const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs'); // Set ejs as template engine
// app.set('views', './views'); //Set "views" as the template directory

const people = [];

app.get('/', (req,res) => {
   res.render('pages/index', {people})
})

app.post('/people', (req,res) => {
    const {firstName, lastName, age} = req.body;
    // console.log(req.body)
    people.push({firstName,lastName,age});
    res.redirect("/")
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
   res.render('pages/data', {
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