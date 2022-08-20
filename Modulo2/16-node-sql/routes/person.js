const { Router } = require('express');
const Contenedor = require('../utils/contenedor');
const router = Router();
const filename = "db.json";

const knex = require('knex');
const knexConfig = require('../knexfile');
const database = knex(knexConfig);
const tableName = "personas"

//
router.get('/', (req, res) => {
    // const c = new Contenedor(filename);
    // res.send(c.getAll());

    //
    database(tableName).select()
      .then(personas => {
        res.send(personas)
      })
      .cath(e => {
        res.send(e)
      })
});


// GET => SELECT
router.get('/:id', async (req, res) => {
    // const c = new Contenedor(filename);
    // const id = req.params.id;
    // res.send(c.getById(id));

    try {
      const id = req.params.id;
      const _persona = await database(tableName)
        // .select('nombre') // to return only the name
        .where('id', id)
      res.send(_persona)

    } catch (err) {
      res.send(err);
    }
});

// POST => INSERT
router.post('/', async (req, res) => {
    // const body = req.body;
    // const c = new Contenedor(filename);
    // if (body.name && body.age) {
    //   const _person = {
    //     name: body.name,
    //     age: body.age
    //   }  
    //   c.save(_person);
    //   res.send(_person)
    // } else {
    //   res.status(400).send('Debe contener nombre y edad');
    // }
    try {
      const _person =  {
        nombre: req.body.nombre,
        edad: req.body.edad,
      }
      const myreq = await database(tableName).insert(_person)
      res.send({..._person, id: myreq[0]})
    } catch (err) {
      res.send(err);
    }
});


router.put('/:id', async (req, res) => {
    // const body = req.body;
    // const id = req.params.id;
    // const c = new Contenedor(filename);
    // if (!c.getById(id)) {
    //   res.status(404).send({error: 'No existe el id'});
    // }
    // if (body.name && body.age) {
    //   const _newPerson = {
    //     name: body.name,
    //     age: body.age
    //   }
    //   c.updateById(id, _newPerson);
    //   res.send(_newPerson);
    // }
  try {
    const _person =  {
      nombre: req.body.nombre,
      edad: req.body.edad,
    }
    const id = req.params.id;

    const resp = await database(tableName)
      .where({id: id})
      .update(_person)
    res.send(resp);
  } catch (err) {
    res.send(err);
  }

});
// 
router.delete('/:id', async (req, res) => {
    // const id = req.params.id;
    // const c = new Contenedor(filename);
    // c.deleteById(id);
    // res.send('Persona eliminada');

    try {
      const id = req.params.id;
      const resp = await database(tableName).where({id:id}).del()
      res.send(resp)

    }  catch (err) {
      res.send(err);
    }
});

module.exports = router;
