var express = require('express');
var router = express.Router();
var low = require('lowdb')
const db = low('db.json')
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
