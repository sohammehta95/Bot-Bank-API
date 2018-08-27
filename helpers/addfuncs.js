var db = require('../models');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Get the signup form
exports.getForm = function(req, res){
    res.render("add.ejs");
}

//Create a single CLIENT using POST request
exports.makeUser = function(req, res)
{
  console.log("--------");  

  console.log("SenderId received " + req.body.senderId);
  
  var comp1 = req.body.comp1;
  var comp2 = req.body.comp2;
  var comp3 = req.body.comp3;
  
  //make the request to IEX API TO FETCH PRICE OF STOCK
  var XHR = new XMLHttpRequest();
  var apiLink = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${comp1},${comp2},${comp3}&types=quote,news,chart&range=5y`;
  XHR.open("GET",apiLink);
  XHR.send();
  
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200) {
      var value = JSON.parse(XHR.responseText);
  
      
      //Finding previous prices of the stock
      var bP1 = -1;
      var bP2 = -1;
      var bP3 = -1;
      
      value[comp1].chart.forEach(function (arrayItem) {
          if(req.body.comp1Date == arrayItem.date)
             bP1 = arrayItem.close;
           
      });
      value[comp2].chart.forEach(function (arrayItem) {
          if(req.body.comp2Date == arrayItem.date)
             bP2 = arrayItem.close;
           
      });
      value[comp3].chart.forEach(function (arrayItem) {
          if(req.body.comp3Date == arrayItem.date)
             bP3 = arrayItem.close;
           
      });

    
          var newClient = {
                    
                  clientName: req.body.name,
                  companies:[
                              {
                                  comName: value[comp1]['quote']['companyName'],
                                  index: value[comp1]['quote']['symbol'],
                                  currPrice: value[comp1]['quote']['latestPrice'],
                                  boughtPrice: bP1,
                                  quantity: req.body.comp1Quanity
                              },
                              {
                                  comName: value[comp2]['quote']['companyName'],
                                  index: value[comp2]['quote']['symbol'],
                                  currPrice: value[comp2]['quote']['latestPrice'],
                                  boughtPrice: bP2,
                                  quantity: req.body.comp2Quanity
                              },
                              {
                                  comName: value[comp3]['quote']['companyName'],
                                  index: value[comp3]['quote']['symbol'],
                                  currPrice: value[comp3]['quote']['latestPrice'],
                                  boughtPrice: bP3,
                                  quantity: req.body.comp3Quanity
                              }
                  ]
                  
        };
        
        for(var x=0;x<=2;x++)
        {
          newClient.companies[x].investment = newClient.companies[x].boughtPrice * newClient.companies[x].quantity;
          newClient.companies[x].currValue = newClient.companies[x].currPrice * newClient.companies[x].quantity;
          newClient.companies[x].net = newClient.companies[x].currValue - newClient.companies[x].investment;
        }
        
        
        //Add in the Databse
        db.User.findOneAndUpdate({senderId: req.body.senderId}, {$push: { clients : newClient } }, {new: true})
        .then(function(newUser){
            res.render("afteradd.ejs",{client: newClient });
        })
        .catch(function(err){
            res.send(err);
        })
         
         
        //res.json(newClient);
    }//if
  }//XHR over
  
  
  // END OF API CALL

    // db.User.create(newUser)
    // .then(function(newUser){
    //   console.log("SenderID from db" + newUser.senderId);
    //   res.status(201).redirect("/close");
    // })
    // .catch(function(err){
    //   res.send(err);
    // })
  
//   res.redirect("/campgrounds");
//   res.send(newUser);
//   res.send("hi");

}

module.exports = exports;