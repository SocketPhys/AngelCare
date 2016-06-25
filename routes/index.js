var express = require('express');
var router = express.Router();
var low = require('lowdb');
const db = low('db.json');
var PokitDok = require('pokitdok-nodejs');
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signUp',function(req,res,next){
    res.render('signup');

});

router.post('/sign',function(req,res,next){

});

module.exports = router;
