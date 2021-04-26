module.exports = function(app){

    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    var urlencodedparser = bodyParser.urlencoded({extended: false});
    const alert = require('alert');
    var connection = mongoose.connection;

    const signupSchema = mongoose.Schema({
        fname: {
            type: String,
            required: true
        },
        lname: String,
        email: {
            type: String,
            required: true
        },
        mobile: Number,
        pswd: String,
        pincode: Number,
        address: String,
        usertype: {
            type: String,
            default: 'patient'},
        date: {
            type: Date,
            default: Date.now
        }
    });

    const Signupdata = new mongoose.model("Signupdata", signupSchema);

    app.get('/login', function(req, res){
        res.render('login');
    });

    app.post('/login', urlencodedparser, function(req, res){
        console.log(req.body);
        if(req.body.isdoctor != 'doctor'){
            const getData = async () => {
                const results = await Signupdata.find({email: req.body.email});
                console.log(results);
                if(results.length == 0){
                    alert("User Not Registerd !! please register first.");
                    res.redirect('/signup');
                }else{
                    if(results[0].email === req.body.email && results[0].pswd === req.body.pswd){
                        alert("LogIn successful !!");
                        req.session.userName = results[0].fname;
                        res.render('index', {user: req.session.userName});
                    }else{
                        alert("Invalid username or password");
                        res.redirect('/login');
                    }
                }
                
            }
            getData();
        }else{
            const getData = async () => {
                const results = await Docdata.find({email: req.body.email});
                console.log(results);
                if(results.length == 0){
                    alert("User Not Registerd !! please register first.");
                    res.redirect('/doc_signup');
                }else{
                    if(results[0].email === req.body.email && results[0].pswd === req.body.pswd){
                        alert("LogIn successful !!");
                        req.session.userName = results[0].fname;
                        res.render('index', {user: req.session.userName});
                    }else{
                        alert("Invalid username or password");
                        res.redirect('/login');
                    }
                }
                
            }
            getData();
        }
        
        
    });

    app.get('/usignup', function(req, res){
        res.render('signup');
    });

    app.post('/usignup', urlencodedparser, function(req, res){
        console.log(req.body);
        const insertData = async () => {
            try{
                const data = new Signupdata({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    pswd: req.body.confpswd,
                    pincode: req.body.pincode,
                    address: req.body.address,
                });

                const results = await data.save();
                console.log(results);

            }catch(err){
                console.log(err);
            }
        }

        insertData();
        res.redirect('/');
    });

    app.get('/logout', function(req, res){
        req.session.destroy(function(err){
            if(err) res.redirect('/');
            else {
                res.redirect('/login');}
        });
    });

};

