module.exports = function(app, docSchema, Docdata){

    const bodyParser = require('body-parser');
	const mongoose = require('mongoose');
	var urlencodedparser = bodyParser.urlencoded({extended: false});

    const appointmentSchema = mongoose.Schema({
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        docemail: String,
        message: String,
        mobile: String,
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
    const Appointment = new mongoose.model('Appointent', appointmentSchema);

    app.get('/appointment', function(req, res){
        var docemail = req.query.docemail;
        res.render('patient_appointment',{user: req.session.userName, docemail: docemail, type: req.session.userType});
    });

    app.get('/app_req', function(req, res){
        var getdata = async () => {
            const results = await Appointment.find({docemail: req.session.email});
            res.render('appointments', {results: results, user: req.session.userName, type: req.session.userType});
        }
        getdata();
    });

    app.post('/appointment', urlencodedparser, function(req, res){
        console.log(req.body);
        const insertData = async () => {
            try{
                const data = new Appointment({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    docemail: req.body.docemail,
                    message: req.body.message,
                });

                const results = await data.save();
                console.log(results);

            }catch(err){
                console.log(err);
            }
        }
        insertData();
        res.render('index', {user: req.session.userName, type: req.session.userType,symptom1:symptom1,symptom2:symptom2,symptom3:symptom3, status: 'done'});

    });

    app.get('/doclist', function(req, res){
        const Doclist = mongoose.model("Docdatas", docSchema);
        var getdata = async () => {
            const results = await Doclist.find({pincode: req.session.pincode});
            console.log(results);
            res.render('doctors_list', {results: results, user: req.session.userName, type: req.session.userType});
        }
        getdata();
    });

    app.get('/myappointments', function(req, res){
        var getdata = async () => {
            const results = await Appointment.find({email: req.session.email});
            res.render('myappointments', {results: results, user: req.session.userName, type: req.session.userType});
        }

        getdata();
    });

    app.get('/reject', function(req, res){
        var reject = async () => {
            await Appointment.deleteMany({_id: req.query.id});
        }
        reject();
        res.redirect('/app_req');
    });

    var symptom1 = ['acidity', 'back_pain', 'bladder_discomfort', 'breathlessness', 'burning_micturition', 'chills', 'continuous_sneezing', 'cough', 'cramps', 'fatigue', 'headache', 'high_fever', 'indigestion', 'itching', 'joint_pain', 'mood_swings', 'muscle_wasting', 'muscle_weakness', 'neck_pain', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'vomiting', 'weakness_in_limbs', 'weight_gain', 'yellowish_skin']
  	var symptom3 = ['abdominal_pain', 'altered_sensorium', 'anxiety', 'blackheads', 'blister', 'blurred_and_distorted_vision', 'breathlessness', 'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'continuous_feel_of_urine', 'cough', 'dark_urine', 'dehydration', 'diarrhoea', 'dischromic _patches', 'dizziness', 'extra_marital_contacts', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'movement_stiffness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'obesity', 'red_sore_around_nose', 'restlessness', 'scurring', 'silver_like_dusting', 'skin_peeling', 'spinning_movements', 'stomach_pain', 'sweating', 'swelling_joints', 'swelling_of_stomach', 'ulcers_on_tongue', 'vomiting', 'watering_from_eyes', 'weakness_of_one_body_side', 'weight_loss', 'yellowish_skin']
  	var symptom2 = ['abdominal_pain', 'acidity', 'anxiety', 'blackheads', 'bladder_discomfort', 'blister', 'breathlessness', 'bruising', 'chills', 'cold_hands_and_feets', 'cough', 'cramps', 'dehydration', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'indigestion', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_peeling', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelling_joints', 'ulcers_on_tongue', 'vomiting', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 'yellowish_skin']

}