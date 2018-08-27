var db = require('../models');

//Get the signup form
exports.getForm = function(req, res){
    res.render("signup.ejs");
}

//Create a single User using POST request
exports.makeUser = function(req, res){
  console.log("SenderId received" + req.body.senderId);
  
    let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.pass,
    senderId: req.body.senderId
    };
    
    db.User.create(newUser)
    .then(function(newUser){
      console.log("SenderID from db" + newUser.senderId);
      res.status(201).redirect("/close");
    })
    .catch(function(err){
      res.send(err);
    })
  
//   res.redirect("/campgrounds");
//   res.send(newUser);
//   res.send("hi");

}

module.exports = exports;