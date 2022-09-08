var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.send('Selamat datang di API NodeJs...');
  // res.redirect('/login');
});

module.exports = router;
