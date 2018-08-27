var express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

var db = require('./models'); //For signup

var userRoutes = require("./routes/user");
var signupRoutes = require("./routes/signup");
var loginRoutes = require("./routes/login");
var addRoutes = require("./routes/add"); //Add Client


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));
app.use(cors());

app.get('/', function(req, res){
    res.render("home.ejs");
});

//Show all Users add delete api endpoints
app.get('/api', function(req, res){
    res.render("api.ejs");
});

app.get('/help', function(req, res){
    res.render("help.ejs");
});

app.use('/api/users', userRoutes);
app.use('/signup', signupRoutes);
app.use('/login',loginRoutes);
app.use('/add',addRoutes);


app.get('/close', function(req, res){
    res.render("close.ejs");
});

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
});
    
    