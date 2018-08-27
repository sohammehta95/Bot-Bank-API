var db = require('../models');

//Get all the users
exports.getUsers = function(req, res){
    db.User.find()
    .then(function(users){
        res.json(users);
    })
    .catch(function(err){
        res.send(err);
    })
}

//Create a single User using POST request
exports.createUser = function(req, res){
  db.User.create(req.body)
  .then(function(newUser){
      res.status(201).json(newUser);
  })
  .catch(function(err){
      res.send(err);
  })
}

//Get a Single User
exports.getUser = function(req, res){
   db.User.findById(req.params.userId)
   .then(function(foundUser){
       res.json(foundUser);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateUser =  function(req, res){
   db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
   .then(function(user){
       res.json(user);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteUser = function(req, res){
   db.User.remove({_id: req.params.userId}) 
   .then(function(){
       res.json({message: 'We deleted it!'});
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;