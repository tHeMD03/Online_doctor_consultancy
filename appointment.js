module.exports = function(app){

    const bodyParser = require('body-parser');
	const mongoose = require('mongoose');
	var urlencodedparser = bodyParser.urlencoded({extended: false});


    app.get('/appointment', function(req, res){
        
    });

    app.get('/app_req', function(req, res){
        res.render('appointments', {user: req.session.userName, type: req.session.userType});
    });

    app.post('/appointment', urlencodedparser, function(req, res){

    });

}