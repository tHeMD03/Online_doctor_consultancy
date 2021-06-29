module.exports = function(app, docSchema, Docdata){

    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    var urlencodedparser = bodyParser.urlencoded({extended: false});
    const alert = require('alert');

    var symptom1 = ['acidity', 'back_pain', 'bladder_discomfort', 'breathlessness', 'burning_micturition', 'chills', 'continuous_sneezing', 'cough', 'cramps', 'fatigue', 'headache', 'high_fever', 'indigestion', 'itching', 'joint_pain', 'mood_swings', 'muscle_wasting', 'muscle_weakness', 'neck_pain', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'vomiting', 'weakness_in_limbs', 'weight_gain', 'yellowish_skin']
  	var symptom3 = ['abdominal_pain', 'altered_sensorium', 'anxiety', 'blackheads', 'blister', 'blurred_and_distorted_vision', 'breathlessness', 'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'continuous_feel_of_urine', 'cough', 'dark_urine', 'dehydration', 'diarrhoea', 'dischromic _patches', 'dizziness', 'extra_marital_contacts', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'movement_stiffness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'obesity', 'red_sore_around_nose', 'restlessness', 'scurring', 'silver_like_dusting', 'skin_peeling', 'spinning_movements', 'stomach_pain', 'sweating', 'swelling_joints', 'swelling_of_stomach', 'ulcers_on_tongue', 'vomiting', 'watering_from_eyes', 'weakness_of_one_body_side', 'weight_loss', 'yellowish_skin']
  	var symptom2 = ['abdominal_pain', 'acidity', 'anxiety', 'blackheads', 'bladder_discomfort', 'blister', 'breathlessness', 'bruising', 'chills', 'cold_hands_and_feets', 'cough', 'cramps', 'dehydration', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'indigestion', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_peeling', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelling_joints', 'ulcers_on_tongue', 'vomiting', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 'yellowish_skin']

    const signupSchema = mongoose.Schema({
        fname: {
            type: String,
            required: true
        },
        lname: String,
        email: {
            type: String,
            required: true,
            unique: true
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

    // const docSchema = mongoose.Schema({
	// 	fname: {
	// 		type: String,
	// 		required: true
	// 	},
	// 	lname: String,
	// 	qualification: String,
	// 	speciality: String,
	// 	email: String,
	// 	mobile: String,
	// 	pswd: String,
	// 	pincode: Number,
	// 	address: String,
    //     usertype: {
    //         type: String,
    //         default: 'doctor'},
	// 	verified: {
	// 		type: Boolean,
	// 		default: undefined
	// 	},
	// 	date: {
    //         type: Date,
    //         default: Date.now
    //     }
	// });

    const Signupdata = new mongoose.model("Signupdata", signupSchema);
    // const Docdata = new mongoose.model("Docdata", docSchema);

    app.get('/login', function(req, res){
        res.render('login');
    });

    app.post('/login', urlencodedparser, function(req, res){
        console.log(req.body);
        if(req.body.isdoctor == 'doctor'){
            const getData = async () => {
                const results = await Docdata.find({email: req.body.email});
                console.log(results);
                if(results.length == 0){
                    alert("User Not Registerd !! please register first.");
                    res.redirect('/docsign');
                }else{
                    if(results[0].email === req.body.email && bcrypt.compareSync(req.body.pswd, results[0].pswd)){
                        alert("LogIn successful !!");
                        req.session.userName = results[0].fname;
                        req.session.userType = 'doctor';
                        req.session.pincode = results[0].pincode;
                        req.session.email = results[0].email;
                        res.render('index', {user: req.session.userName, type: req.session.userType, symptom1: symptom1,symptom2: symptom2,symptom3: symptom3});
                    }else{
                        alert("Invalid username or password");
                        res.redirect('/login');
                    }
                }
                
            }
            getData();
        }else{
            const getData = async () => {
                const results = await Signupdata.find({email: req.body.email});
                console.log(results);
                if(results.length == 0){
                    alert("User Not Registerd !! please register first.");
                    res.redirect('/usignup');
                }else{
                    // const user_password = bcrypt.hashSync(req.body.pswd, 10);
                    if(results[0].email === req.body.email && bcrypt.compareSync(req.body.pswd, results[0].pswd)){
                        alert("LogIn successful !!");
                        req.session.userName = results[0].fname;
                        req.session.email = results[0].email;
                        req.session.userType = 'patient';
                        req.session.pincode = results[0].pincode;
                        res.render('index', {user: req.session.userName, type: req.session.userType, symptom1: symptom1, symptom2: symptom2, symptom3: symptom3});
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
                const password = bcrypt.hashSync(req.body.confpswd, 10);
                const data = new Signupdata({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    pswd: password,
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
        res.redirect('/login');
    });

    app.post('/docsign', urlencodedparser, function(req, res){
		console.log(req.body);
		const insertData = async () => {
            try{
                const data = new Docdata({
                    fname: req.body.fname,
                    lname: req.body.lname,
					qualification: req.body.qualification,
					speciality: req.body.speciality,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    pswd: bcrypt.hashSync(req.body.confpswd, 10),
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
        res.redirect('/login');
	});

    app.get('/logout', function(req, res){
        req.session.destroy(function(err){
            if(err) res.redirect('/');
            else {
                res.redirect('/login');}
        });
    });

};

