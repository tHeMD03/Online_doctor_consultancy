module.exports = function(app){

    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    var urlencodedparser = bodyParser.urlencoded({extended: false});

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
        date: {
            type: Date,
            default: Date.now
        }
    });

    const Signupdata = new mongoose.model("Signupdata", signupSchema);

    app.get('/login', function(req, res){
        res.render('login');
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
                    pswd: req.body.cpswd,
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
        res.render('index');
    });
};