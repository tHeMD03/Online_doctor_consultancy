var express = require('express');
var doctor = require('./doctor');
var log_sign = require('./log_sign');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ODC_db", {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('Connection Successful'))
    .catch((err) => console.log(err));

var app = express();

app.set('view engine', 'ejs');

app.use('/css', express.static('css'));
app.use('/scss', express.static('scss'));
app.use('/vendors', express.static('vendors'));
app.use('/img', express.static('img'));
app.use('/my-icons-collection', express.static('my-icons-collection'));
app.use('/js', express.static('js'));
app.use('/fonts', express.static('fonts'));
app.use('/Medcare Medical -doc', express.static('Medcare Medical -doc'));

doctor(app);
log_sign(app);

app.get('/', function(req, res){
	res.render('index');
});

app.get('/home', function(req, res){
	res.render('index');
});


app.listen(8080, () => {
	console.log('Server running on Port 8080....');
});