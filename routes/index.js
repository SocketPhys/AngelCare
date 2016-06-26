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

    /*pokitdok.providers({
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
    });*/
    
    pokitdok.eligibility({
     member: {
        birth_date: birthdate,
        first_name: firstName,
        last_name: lastName,
       
        
    },
    provider: {
        first_name: pfirstName,
        
        last_name: plastName,
        npi:npi,
        
    },
    service_types: ['health_benefit_plan_coverage'],
    trading_partner_id: 'MOCKPAYER'
}, function (err, res) {
    // print the member eligibility for the specified provider
    var start = res['data']['summary']['out_of_pocket']['individual'];
    var inLimit = start['in_network']['limit']['amount']
    var inRemaining = start['in_network']['remaining']['amount']
    var outLimit = start['out_of_network']['limit']['amount']
    var outRemaining = start['out_of_network']['remaining']['amount']
    var drugs = db.get('users')
                .get('drugs')
                .value()
    resp.render('index',{inLimit:inLimit,inRemaining:inRemaining,outLimit:outLimit,outRemaining:outRemaining,drugs:drugs});
        
        
});
    
    
    
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

router.post('/cpt',function(req,resp,next){
    var code= req.body.code;
    if(code==null){
        code='95017'
    }
    console.log(code)
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
        console.log(price);
        resp.render('cpt',{highPrice:highPrice,median:medianPrice,average:averagePrice,low:lowPrice, desc:procedureDescription});
    });
});


router.post('/insurance',function(req,resp,next){
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
        var price = res['data']['amounts'][0]
        console.log(price);
        var highPrice = price['high_price']
        var cptCode = price['cpt_code']
        var procedureDescription = price['procedure_description']
        var standardDeviation = price['standard_deviation']
        var averagePrice = price['average_price']
        var lowPrice = price['low_price']
        var medianPrice = price['median_price']
        console.log(price);
        resp.render('insurance',{highPrice:highPrice,median:medianPrice,average:averagePrice,low:lowPrice});
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

router.post('/drug',function(req,res,next){
    var drug = req.body.drug;
    console.log(drug)
   options = {
       "trading_partner_id": "medicare_national",
       "plan_number": "S5884114",
       "drug":drug
   }
    pokitdok.apiRequest({
       path: '/pharmacy/formulary',
       method: 'GET',
       qs: options
   }, function(err, res) {
      // print the activity name status and id
          var activity = res['data'][0]
          var reIn = activity['retail']['ins_pay_30_day']['amount']
          var reOut = activity['retail']['oop_30_day']['amount']
          var maIn = activity['mail']['ins_pay_90_day']['amount']
          var maOut = activity['mail']['oop_90_day']['amount']
          db.get('users')
            .get('drugs')
            .push({drug:{'name':drug,'reIn':reIn,'reOut':reOut,'maIn':maIn,'maOut':maOut}})
            .value()
          request.get('http://localhost:3000/')
   });



    /*pokitdok.pharmacy_formulary({

        trading_partner_id:'MOCKPAYER', 
        plan_number:'S5884114', 
        drug:'simvastatin'

    },function(err,res){
        console.log(res)
    });*/

});

router.get('/provider',function(req,resp,next){
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
    
   var birthdate = db.get('users')
  .get('birthDate')
  .value()
   
   var npi = db.get('users')
  .get('npi')
  .value()

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
        resp.render('provider',{'fax':fax,'degree':degree,'gender':gender,'phone':phone,'birthDate':birthDate,'residencies':residencies,'licensures':licensures,'locations':locations,'specialty_primary':specialty_primary,'specialty':specialty,'board_certifications':board_certifications, 'licenses':licenses,'education':education,'specialty_secondary':specialty_secondary,'pfirstName':pfirstName, 'plastName':plastName})
    });
    
});

module.exports = router;
