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
  
  var comp1 = req.body.comp1.toUpperCase();
  var comp2 = req.body.comp2.toUpperCase();
  var comp3 = req.body.comp3.toUpperCase();
  
  //make the request to IEX API TO FETCH PRICE OF STOCK
  var XHR = new XMLHttpRequest();
  var apiLink = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${comp1},${comp2},${comp3}&types=quote,news,chart&range=5y`;
  XHR.open("GET",apiLink);
  XHR.send();
  
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200) {
      
      var value = JSON.parse(XHR.responseText);
  
      if(Object.keys(value).length != 3)
        res.json({"error": "One of the Symbols were not correct"})
      else
      {
        //Finding previous prices of the stock
        var bP1 = -1;
        var bP2 = -1;
        var bP3 = -1;
        
        for(var i=0;i<value[comp1].chart.length;i++)
        {
          var arrayItem = value[comp1].chart[i];
          //https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
          if(req.body.comp1Date == arrayItem.date || dates.compare(arrayItem.date,req.body.comp1Date)==1)
          {
            //console.log("comp1Date: " +req.body.comp1Date);
            //console.log("The day that is selected is: " + arrayItem.date);
            bP1 = arrayItem.close; 
            break;
          }
               
        }
        
        for(var i=0;i<value[comp2].chart.length;i++)
        {
          var arrayItem = value[comp2].chart[i];
          //https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
          if(req.body.comp2Date == arrayItem.date || dates.compare(arrayItem.date,req.body.comp2Date)==1)
          {
            //console.log("comp2Date: " +req.body.comp2Date);
            //console.log("The day that is selected is: " + arrayItem.date);
            bP2 = arrayItem.close; 
            break;
          }
               
        }
        
        for(var i=0;i<value[comp3].chart.length;i++)
        {
          var arrayItem = value[comp3].chart[i];
          //https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
          if(req.body.comp3Date == arrayItem.date || dates.compare(arrayItem.date,req.body.comp3Date)==1)
          {
            //console.log("comp3Date: " +req.body.comp3Date);
            //console.log("The day that is selected is: " + arrayItem.date);
            bP3 = arrayItem.close; 
            break;
          }
             
        }
        
        
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
        
        newClient.clientInvestment = 0;
        newClient.clientPortfolio = 0;
        newClient.clientNet = 0;
        
        for(var x=0;x<=2;x++)
        {
          newClient.companies[x].investment = newClient.companies[x].boughtPrice * newClient.companies[x].quantity;
          newClient.companies[x].currValue = newClient.companies[x].currPrice * newClient.companies[x].quantity;
          newClient.companies[x].net = newClient.companies[x].currValue - newClient.companies[x].investment;
          
          newClient.clientInvestment+= newClient.companies[x].investment;
          newClient.clientPortfolio+= newClient.companies[x].currValue;
          newClient.clientNet+=newClient.companies[x].net;
        }
        
        //Add in the Databse
        db.User.findOneAndUpdate({senderId: req.body.senderId}, {$push: { clients : newClient } }, {new: true})
        .then(function(newUser){
            res.render("afteradd.ejs",{client: newClient });
        })
        .catch(function(err){
            res.send(err);
        })
        
      }//else
      
    }//if
  }//XHR over
  
  
  // END OF API CALL


}


var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like

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
//   res.send("hi");        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}



module.exports = exports;