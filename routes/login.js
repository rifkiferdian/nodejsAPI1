require('dotenv').config();
var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Userslogin } = require('../models');
const { Sequelize } = require("sequelize");
var JWT = require('jsonwebtoken');
const { reject } = require('bcrypt/promises');
const { generateToken } = require("../middleware/jwt_token");

const v = new Validator();

/* GET users listing. */
router.post('/',async (req, res, next) => {

  const asd = await generateToken();
  res.status(200).json({message:asd});

});


module.exports = router;
