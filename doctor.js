module.exports = function(app){

	var bodyparser = require('body-parser');
	const mongoose = require('mongoose');
	var urlencodedparser = bodyparser.urlencoded({extended: false});

	const docSchema = mongoose.Schema({
		fname: {
			type: String,
			required: true
		},
		lname: String,
		qualification: String,
		speciality: String,
		email: String,
		mobile: String,
		pswd: String,
		pincode: Number,
		address: String,
		date: {
            type: Date,
            default: Date.now
        }
	});

	const Docdata = mongoose.model('Docdata', docSchema);

	app.get('/doctors', function(req, res){
		res.render('doctors', {user: req.session.userName});
	});

	app.get('/docsign', function(req, res){
		res.render('doc_signup');
	});

	app.post('/docsign', urlencodedparser, function(req, res){
		console.log(req.body);
		res.render('index', {user: req.session.userName});
	})
};