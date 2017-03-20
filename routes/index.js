var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.sendfile(__dirname + '../index.html');
});

router.get('/index', function (req, res) {
  res.sendfile(__dirname + '../index.html');
});

router.get('/public/styles.css', function (req, res) {
  res.sendfile(__dirname + '../public/styles.css');
});

router.get('/public/main.js', function (req, res) {
  res.sendfile(__dirname + '../public/main.js');
});

module.exports = router;