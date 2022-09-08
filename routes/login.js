var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const { Users } = require('../models');
const { Sequelize } = require("sequelize");


const v = new Validator();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('200');
});


module.exports = router;
