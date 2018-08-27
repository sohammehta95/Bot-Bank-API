var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb://soham:soham1@ds041841.mlab.com:41841/bank-bot-db", { useMongoClient: true });

mongoose.Promise = Promise;

module.exports.User = require("./user");