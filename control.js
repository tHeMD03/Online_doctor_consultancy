var express = require('express');
var doctor = require('./doctor');
var log_sign = require('./log_sign');
const appointment = require('./appointment');
const alert = require('alert');
var session = require('express-session');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

mongoose.connect("mongodb://localhost:27017/ODC_db", {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('Connection Successful'))
    .catch((err) => console.log(err));

var app = express();

app.set('view engine', 'ejs');

app.use(session({
	secret: 'a1b2c3d4',
	cookie: {maxAge: 1000 * 60 * 60 * 24},
	resave: false,
	saveUninitialized: true
}))

app.use(cookieParser());

app.use('/css', express.static('css'));
app.use('/scss', express.static('scss'));
app.use('/vendors', express.static('vendors'));
app.use('/img', express.static('img'));
app.use('/my-icons-collection', express.static('my-icons-collection'));
app.use('/js', express.static('js'));
app.use('/fonts', express.static('fonts'));
app.use('/Medcare Medical -doc', express.static('Medcare Medical -doc'));

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
	usertype: {
		type: String,
		default: 'doctor'},
	verified: {
		type: Boolean,
		default: undefined
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Docdata = new mongoose.model("Docdata", docSchema);


doctor(app);
log_sign(app, docSchema, Docdata);
appointment(app, docSchema, Docdata);

app.get('/', function(req, res){
	var symptom1 = ['acidity', 'back_pain', 'bladder_discomfort', 'breathlessness', 'burning_micturition', 'chills', 'continuous_sneezing', 'cough', 'cramps', 'fatigue', 'headache', 'high_fever', 'indigestion', 'itching', 'joint_pain', 'mood_swings', 'muscle_wasting', 'muscle_weakness', 'neck_pain', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'vomiting', 'weakness_in_limbs', 'weight_gain', 'yellowish_skin']
  	var symptom3 = ['abdominal_pain', 'altered_sensorium', 'anxiety', 'blackheads', 'blister', 'blurred_and_distorted_vision', 'breathlessness', 'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'continuous_feel_of_urine', 'cough', 'dark_urine', 'dehydration', 'diarrhoea', 'dischromic _patches', 'dizziness', 'extra_marital_contacts', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'movement_stiffness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'obesity', 'red_sore_around_nose', 'restlessness', 'scurring', 'silver_like_dusting', 'skin_peeling', 'spinning_movements', 'stomach_pain', 'sweating', 'swelling_joints', 'swelling_of_stomach', 'ulcers_on_tongue', 'vomiting', 'watering_from_eyes', 'weakness_of_one_body_side', 'weight_loss', 'yellowish_skin']
  	var symptom2 = ['abdominal_pain', 'acidity', 'anxiety', 'blackheads', 'bladder_discomfort', 'blister', 'breathlessness', 'bruising', 'chills', 'cold_hands_and_feets', 'cough', 'cramps', 'dehydration', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'indigestion', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_peeling', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelling_joints', 'ulcers_on_tongue', 'vomiting', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 'yellowish_skin']
	res.render('index', {user: req.session.userName, type: req.session.userType,symptom1:symptom1,symptom2:symptom2,symptom3:symptom3});
});

app.get('/home', function(req, res){
	var symptom1 = ['acidity', 'back_pain', 'bladder_discomfort', 'breathlessness', 'burning_micturition', 'chills', 'continuous_sneezing', 'cough', 'cramps', 'fatigue', 'headache', 'high_fever', 'indigestion', 'itching', 'joint_pain', 'mood_swings', 'muscle_wasting', 'muscle_weakness', 'neck_pain', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'vomiting', 'weakness_in_limbs', 'weight_gain', 'yellowish_skin']
  	var symptom3 = ['abdominal_pain', 'altered_sensorium', 'anxiety', 'blackheads', 'blister', 'blurred_and_distorted_vision', 'breathlessness', 'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'continuous_feel_of_urine', 'cough', 'dark_urine', 'dehydration', 'diarrhoea', 'dischromic _patches', 'dizziness', 'extra_marital_contacts', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'movement_stiffness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'obesity', 'red_sore_around_nose', 'restlessness', 'scurring', 'silver_like_dusting', 'skin_peeling', 'spinning_movements', 'stomach_pain', 'sweating', 'swelling_joints', 'swelling_of_stomach', 'ulcers_on_tongue', 'vomiting', 'watering_from_eyes', 'weakness_of_one_body_side', 'weight_loss', 'yellowish_skin']
  	var symptom2 = ['abdominal_pain', 'acidity', 'anxiety', 'blackheads', 'bladder_discomfort', 'blister', 'breathlessness', 'bruising', 'chills', 'cold_hands_and_feets', 'cough', 'cramps', 'dehydration', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'indigestion', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_peeling', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelling_joints', 'ulcers_on_tongue', 'vomiting', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 'yellowish_skin']
	res.render('index', {user: req.session.userName, type: req.session.userType,symptom1:symptom1,symptom2:symptom2,symptom3:symptom3});
	});


app.listen(8080, () => {
	console.log('Server running on Port 8080....');
});
