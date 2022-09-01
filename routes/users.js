var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Users } = require('../models');
const { Op } = require("sequelize");


const v = new Validator();

/* GET users listing. */
router.post('/', async (req, res) => {
  // res.send('Hello world..!');
  // res.send(process.env.APP_NAME);

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


/* GET users listing. */
router.get('/', async (req, res) => {

  const users = await Users.findAll();
  // console.log("All users:", JSON.stringify(users, null, 2));
  res.status(200).json(users);

});


router.get('/:id', async (req, res) => {
  id = req.params.id;
  // const usersId = await Users.findAll({
  //   where: {
  //     id: id
  //   }
  // });

  const usersId = await Users.findByPk(id);
  if(usersId === null) return res.status(404).json({message:"User Id Tidak ditemukan..!"});
  res.status(200).json(usersId);

});

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

module.exports = router;
