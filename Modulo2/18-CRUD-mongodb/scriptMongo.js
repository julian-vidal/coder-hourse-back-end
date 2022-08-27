/* ===========================
CREATE
=========================== */

db.movies.insertOne({
    title: "Fight Club",
    writer: "Chuck Palahniuk",
    year: 1999,
    actors: [
        "Brad Pitt",
        "Edward Norton"
    ]
});


db.movies.insertOne({title : "Pulp Fiction", writer : "Quentin Tarantino", year : 1994, actors : ["John Travolta", "Uma Thurman"]});

db.movies.insertMany([
{title : "Inglorious Basterds",
writer : "Quentin Tarantino",
year : 2009,
actors : ["Brad Pitt","Diane Kruger","Eli Roth"]},

{title : "The Hobbit: An Unexpected Journey",
writer : "J.R.R. Tolkein",
year : 2012,
franchise : "The Hobbit"}
]); 


/* ===========================
READ
=========================== */
db.movies.find()




/* ===========================
Document count
=========================== */
db.usuarios.estimatedDocumentCount() // No es preciso
db.movies.estimatedDocumentCount()


db.movies.countDocuments({year: 2012}) // Mas preciso pero mas lento. Recibe un objeto para filtrar. Util para encontrar duplicados
