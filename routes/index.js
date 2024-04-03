var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GP1 Agua Parte 2' });
});
router.get('/pag1', function(req, res, next) {
  res.render('pag1', { });
});
router.get('/pag2', function(req, res, next) {
  res.render('pag2', { });
});
router.get('/pag3', function(req, res, next) {
  res.render('pag3', { });
});
router.get('/pag4', function(req, res, next) {
  res.render('pag4', { });
});
module.exports = router;
