var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	senderId: {
        type: String,
        default: "N/A"
    },
    name: String,
    email:String,
    password:String,
    clients: [],
    created_date: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;