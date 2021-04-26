module.exports = function(app){

	var bodyparser = require('body-parser');

	var urlencodedparser = bodyparser.urlencoded({extended: false});

	app.get('/doctors', function(req, res){
		res.render('doctors');
	});

	app.get('/docsign', function(req, res){
		res.render('doc_signup');
	});

	app.post('/docsign', urlencodedparser, function(req, res){
		console.log(req.body);
		res.render('index');
	})
};