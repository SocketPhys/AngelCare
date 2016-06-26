var express = require('express');
var router = express.Router();
var low = require('lowdb');
const db = low('db.json');
var PokitDok = require('pokitdok-nodejs');
var POKITDOK_CLIENT_ID = 'G34YogEdr3EnU0Z9QJg9';
var POKITDOK_CLIENT_SECRET = 'pT7B4MVjZFpIbmTBg37xzB84E9KOobNG05raWto0'
var pokitdok = new PokitDok(POKITDOK_CLIENT_ID, POKITDOK_CLIENT_SECRET);
var request = require('request');
/* GET home page. */

router.get('/', function(req, res, next) {
  var firstName =  db.get('users')
  .get('firstName')
  .value();

  var pfirstName =  db.get('users')
  .get('pfirstName')
  .value();

  var address = db.get('users')
  .get('address')
  .value();

  var city = db.get('users')
  .get('city')
  .value();

  var lastName= db.get('users')
  .get('lastName')
  .value();

  var plastName= db.get('users')
  .get('plastName')
  .value();

  var gender = db.get('users')
  .get('gender')
  .value();

  var radius = 20;

  var state = db.get('users')
  .get('state')
  .value();

  var zipcode = db.get('users')
  .get('zipcode')
  .value();


  /*pokitdok.apiRequest({
    path: '/providers/',
    method: 'GET',
    qs: 'address_lines=' + address + '&first_name=' + firstName + '&last_name=' + lastName + '&gender=' + gender + '&state=' + state + '&zipcode=' + zipcode + '&radius=' + radius,
  },function(err,res){
        console.log(err);
        console.log(res);
  
    
  
  });*/

    pokitdok.providers({
       zipcode: zipcode,
       first_name: pfirstName,
       last_name:  plastName,
       state: state,
       radius:radius,
       limit: 1
    }, function(err, res){
        var fax = res.data[0]['provider']['fax'] 
        var degree = res.data[0]['provider']['degree']
        var gender = res.data[0]['provider']['gender']
        var phone = res.data[0]['provider']['phone']
        var birthDate = res.data[0]['provider']['birth_date']
        var residencies = res.data[0]['provider']['residencies']
        var licensures = res.data[0]['provider']['licensures']
        var locations = res.data[0]['provider']['locations']
        var specialty_primary = res.data[0]['provider']['specialty_primary']
        var specialty = res.data[0]['provider']['specialty']
        var board_certifications = res.data[0]['provider']['board_certifications']
        var licenses = res.data[0]['provider']['licenses']
        var education = res.data[0]['provider']['education']
        var specialty_secondary = res.data[0]['provider']['specialty_secondary']
        console.log(fax  + " " + phone +" " + gender + " " + degree + " " + birthDate + " " + JSON.stringify(residencies) + " " + JSON.stringify(licensures) +" " + JSON.stringify(locations) + " " + JSON.stringify(specialty_primary) + " " + specialty + " " + board_certifications + " " + JSON.stringify(licenses) + " " + JSON.stringify(education) + " " + specialty_secondary);
    });
});

router.get('/signUp',function(req,res,next){
    res.render('signup');

});

router.post('/sign',function(req,res,next){

});

module.exports = router;
