var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Users } = require('../models');
const { Sequelize } = require("sequelize");
const { Pool, Client } = require('pg');


const v = new Validator();

/* GET users listing. */
router.get('/', async (req, res,next) => {

  const users = await Users.findAll();
  // console.log("All users:", JSON.stringify(users, null, 2));
  res.status(200).json(users);


// MENCOBA KONEKSI POSTGRESQL
  // const sequelize = new Sequelize('latihanDB', 'postgres', '123', {
  //   host: 'localhost',
  //   posr: 5432,
  //   dialect: 'postgres',
  //   logging: false
  // })

  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  //   console.log('asdasdasda');
  // }

  // res.send('ok');

});

/* POST users listing. */
router.post('/', async (req, res) => {
  const schema = {
    nama: { type: "string", min: 3, max: 255 },
    alamat: { type: "string" },
  };

  const check = v.validate(req.body,schema);
  if (check.length){
    return res
      .status(400)
      .json(check);
  }

  const InputUsers = await Users.create(req.body);

  res.status(201).json(InputUsers);
});

/* POST users listing. */
router.get('/:id', async (req, res, next) => {
  id = req.params.id;
  // const usersId = await Users.findAll({
  //   where: {
  //     id: id
  //   }
  // });

  const usersId = await Users.findByPk(id);
  // pakai res biasa
  // if(usersId === null) return res.status(404).json({message:"User Id Tidak ditemukan..!"});
  
  // pakai res dari next Error
  const err = new Error('User Id Tidak ditemukan..!');
  err.status = 404;
  if(usersId === null) return next(err);

  res.status(200).json(usersId);

});

/* DEL users listing. */
router.delete('/:id', async (req, res) => {
  id = req.params.id;
  const usersId = await Users.findByPk(id);
  if(!usersId) return res.status(404).json({message:"User Id Tidak ditemukan..!"});
  await Users.destroy({
    where: {
      id: id
    },
    force: true
  });
  res.status(200).json({message:"User Id Sudah terhapus..!"});
});


/* POST users listing. */
router.put('/:id', async (req, res) => {
  id = req.params.id;
  const usersId = await Users.findByPk(id);
  if(usersId === null) return res.status(404).json({message:"User Id Tidak ditemukan..!"});

  const schema = {
    nama: { type: "string", min: 3, max: 255 },
    alamat: { type: "string" },
  };

  const check = v.validate(req.body,schema);
  if (check.length){
    return res
      .status(400)
      .json(check);
  }

  const UpdateUsers = await usersId.update(req.body);

  res.status(200).json(UpdateUsers);
});

module.exports = router;
