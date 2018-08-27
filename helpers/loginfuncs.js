var db = require('../models');

//Get the signup form
exports.getForm = function(req, res){
    res.render("login.ejs");
}

//Create a single User using POST request
exports.makeUser = function(req, res){
  console.log("PLEASE TELL ME IM HERE");
  res.redirect("/close");
//   res.send(newUser);
//   res.send("hi");

}

module.exports = exports;