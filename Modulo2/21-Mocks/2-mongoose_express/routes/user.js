const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  getById,
  saveUser,
  updateById,
  deleteById,
} = require("../controllers/user");
const { UserSchema, User } = require("../schemas/user");

//GET ALL localhost/person
router.get("/", getAllUsers);
// GET localhost/person/:id
router.get("/:id", getById);
// POST localhost/person
router.post("/", saveUser);
// PUT localhost/person/:id
router.put("/:id", updateById);
// DELETE localhost/person/:id
router.delete("/:id", deleteById);



// MOCKING API

const fakeUsers = require("../utils/fakeUser")

router.post("/popular", (req,res) => {
  const cant = req.query.cant || 50;
  const usuarios = fakeUsers(cant);
  const _users = []

  for (let usuario of usuarios) {
    const _user = new User(usuario);
    _user.save();
    _users.push(_user);
  }

  res.json(_users)
})


module.exports = router;
