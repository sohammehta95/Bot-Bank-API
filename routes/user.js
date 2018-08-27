var express = require('express');
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/funcs");
var fbhelpers = require("../helpers/fbfuncs");

router.route('/')
 .get(helpers.getUsers)
 .post(helpers.createUser)
 
router.route('/:userId')
  .get(helpers.getUser)
  .put(helpers.updateUser)
  .delete(helpers.deleteUser)
  
router.route('/fbid/:fbId')
.get(fbhelpers.getUser)
.put(fbhelpers.updateUser)
.delete(fbhelpers.deleteUser)

module.exports = router;