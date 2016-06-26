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

  var radius = db.get('users')
  .get('radius')
  .value()

  var state = db.get('users')
  .get('state')
  .value();

  var zipcode = db.get('users')
  .get('zipCode')
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
       first_name: pfirstName,
       last_name:  plastName,
       state: state,
       radius:radius,
       limit: 1
    }, function(err, res){
        console.log(res.data[0]['provider']['npi'])
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

    res.render('index');
});

router.get('/settings',function(req,res,next){
    var firstName =  db.get('users')
  .get('firstName')
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


  var gender = db.get('users')
  .get('gender')
  .value();

  var radius = db.get('users')
  .get('radius')
  .value()

  var state = db.get('users')
  .get('state')
  .value();

  var zipcode = db.get('users')
  .get('zipcode')
  .value();

  var birthdate = db.get('users')
  .get('birthDate')
  .value()
  
  var tradingID = db.get('users')
  .get('tradingID')
  .value()

  var planNum = db.get('users')
  .get('planNum')
  .value()
   

});

router.get('/cpt',function(req,res,next){
    var code = '95017';
    var zipcode = db.get('users')
   .get('zipCode')
   .value();

   pokitdok.cashPrices({
        zip_code: zipcode,
        cpt_code: code
    }, function (err, res) {
    // print the cpt, geo_zip and average price
        var price = res.data[0]
        var highPrice = price['high_price']
        var cptCode = price['cpt_code']
        var procedureDescription = price['procedure_description']
        var standardDeviation = price['standard_deviation']
        var averagePrice = price['average_price']
        var lowPrice = price['low_price']
        var medianPrice = price['median_price']
        //console.log(price.cpt_code + ':' + price.geo_zip_area +  ':' + price.average);
    });
});


router.get('/insurance',function(req,res,next){
   var code = '95017';
   var zipcode = db.get('users')
   .get('zipCode')
   .value();

   pokitdok.insurancePrices({
        zip_code: zipcode,
        cpt_code: code
    }, function (err, res) {
    // print the cpt and geo_zip
    // print the average price per payment types
        var price = res.data;
        console.log(price)
    }); 

});

router.get('/eligibity',function(req,res,next){
 var firstName =  db.get('users')
  .get('firstName')
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


  var gender = db.get('users')
  .get('gender')
  .value();

  var radius = db.get('users')
  .get('radius')
  .value()

  var state = db.get('users')
  .get('state')
  .value();

  var zipcode = db.get('users')
  .get('zipcode')
  .value();

  var birthdate = db.get('users')
  .get('birthDate')
  .value()

  var tradingID = db.get('users')
  .get('tradingID')
  .value()

  var planNum = db.get('users')
  .get('planNum')
  .value()
 
  var npi = db.get('users')
  .get('npi')
  .value()
 
   var pfirstName =  db.get('users')
  .get('pfirstName')
  .value();

  var plastName= db.get('users')
  .get('plastName')
  .value();   

pokitdok.eligibility({
     member: {
        birth_date: birthdate,
        first_name: firstName,
        last_name: lastName
        
    },
    provider: {
        first_name: pfirstName,
        last_name: plastName,
        npi:npi
    },
    service_types: ['health_benefit_plan_coverage'],
    trading_partner_id: 'MOCKPAYER'
}, function (err, res) {
    // print the member eligibility for the specified provider
    console.log(res['data']['summary']['out_of_pocket']['individual']);
});

});

router.get('/drug',function(req,res,next){

    pokitdok.apiRequest({
       path: '/pharmacy/formulary/',
       method: 'GET',
       qs: 'trading_partner_id=MOCKPAYER&plan_number=S5884114&drug=simvastatin',
   }, function(err, res) {
      if (err) {
        return console.log(err, res.statusCode);
      }
      // print the activity name status and id
          var activity = res
          console.log(activity);
   });



    /*pokitdok.pharmacy_formulary({

        trading_partner_id:'MOCKPAYER', 
        plan_number:'S5884114', 
        drug:'simvastatin'

    },function(err,res){
        console.log(res)
    });*/

});

module.exports = router;
