var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Users, Userslogin } = require('../models');
const bcrypt = require('bcrypt');

const v = new Validator();


/* GET users listing. */
router.get('/', async (req, res) => {

  const UsersLogin = await Userslogin.findAll({
    attributes: ['id_user','username', 'password','createdAt','updatedAt',]
  });
  res.status(200).json(UsersLogin);

});

/* POST users listing. */
router.post('/', async (req, res, next) => {

  const schema = {
    id_user: { type: "number", positive: true, integer: true},
    username: { type: "string", min: 5},
    password: { type: "string", min: 5},
  };

  const usersId = await Users.findByPk(req.body.id_user);
  if(!usersId) return res.status(404).json({message:"Id User Tidak ditemukan..!"});
 
  const check = v.validate(req.body,schema);
  if (check.length){
    return res
    .status(400)
    .json(check);
  }

  const hasedPassword = await bcrypt.hash(req.body.password,10);
  const InputData = {
    id_user: req.body.id_user,
    username: req.body.username,
    password: hasedPassword,
  };

  try {
    const InputUsers = await Userslogin.create(InputData);
    res.status(201).json(InputUsers);
  } catch (error) {
    res.status(409).json({message:error.parent.text});
  }
});

/* POST users listing. */
router.get('/:id', async (req, res, next) => {
  id = req.params.id;
  const usersId = await Userslogin.findByPk(id);

  const err = new Error('User Id Tidak ditemukan..!');
  err.status = 404;
  if(usersId === null) return next(err);

  res.status(200).json(usersId);

});

/* DEL users listing. */
router.delete('/:id', async (req, res) => {
  id = req.params.id;
  const usersId = await Userslogin.findByPk(id);
  if(!usersId) return res.status(404).json({message:"User Id Tidak ditemukan..!"});
  await Userslogin.destroy({
    where: {
      id_user: id
    },
    force: true
  });
  res.status(200).json({message:"User Id Sudah terhapus..!"});
});


/* POST users listing. */
router.put('/:id', async (req, res) => {
  id = req.params.id;
  const usersId = await Userslogin.findByPk(id);
  if(usersId === null) return res.status(404).json({message:"User Id Tidak ditemukan..!"});

  const schema = {
    username: { type: "string", min: 5},
    password: { type: "string", min: 5},
  };

  const check = v.validate(req.body,schema);
  if (check.length){
    return res
      .status(400)
      .json(check);
  }

  const hasedPassword = await bcrypt.hash(req.body.password,10);
  const InputData = {
    username: req.body.username,
    password: hasedPassword,
  };
  const UpdateUsers = await usersId.update(InputData);

  res.status(200).json(UpdateUsers);
});


module.exports = router;
