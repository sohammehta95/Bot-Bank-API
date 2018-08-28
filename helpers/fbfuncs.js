var db = require('../models');

//Get a Single User using FB ID (senderId in db)
exports.getUser = function(req, res){
   db.User.find({senderId: req.params.fbId})
   .then(function(foundUser){
       res.json(foundUser).sendStatus(200);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateUser =  function(req, res){
   db.User.findOneAndUpdate({senderId: req.params.fbId}, req.body, {new: true})
   .then(function(user){
       res.json(user).sendStatus(200);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteUser = function(req, res){
   db.User.remove({senderId: req.params.fbId}) 
   .then(function(){
       res.json({message: 'We deleted it!'}).sendStatus(200);
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;