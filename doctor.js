module.exports = function(app){

	const bodyParser = require('body-parser');
	const mongoose = require('mongoose');
	const bcrypt = require('bcrypt');
	var urlencodedparser = bodyParser.urlencoded({extended: false});

	var symptom1 = ['acidity', 'back_pain', 'bladder_discomfort', 'breathlessness', 'burning_micturition', 'chills', 'continuous_sneezing', 'cough', 'cramps', 'fatigue', 'headache', 'high_fever', 'indigestion', 'itching', 'joint_pain', 'mood_swings', 'muscle_wasting', 'muscle_weakness', 'neck_pain', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'vomiting', 'weakness_in_limbs', 'weight_gain', 'yellowish_skin']
  	var symptom3 = ['abdominal_pain', 'altered_sensorium', 'anxiety', 'blackheads', 'blister', 'blurred_and_distorted_vision', 'breathlessness', 'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'continuous_feel_of_urine', 'cough', 'dark_urine', 'dehydration', 'diarrhoea', 'dischromic _patches', 'dizziness', 'extra_marital_contacts', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'movement_stiffness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'obesity', 'red_sore_around_nose', 'restlessness', 'scurring', 'silver_like_dusting', 'skin_peeling', 'spinning_movements', 'stomach_pain', 'sweating', 'swelling_joints', 'swelling_of_stomach', 'ulcers_on_tongue', 'vomiting', 'watering_from_eyes', 'weakness_of_one_body_side', 'weight_loss', 'yellowish_skin']
  	var symptom2 = ['abdominal_pain', 'acidity', 'anxiety', 'blackheads', 'bladder_discomfort', 'blister', 'breathlessness', 'bruising', 'chills', 'cold_hands_and_feets', 'cough', 'cramps', 'dehydration', 'fatigue', 'foul_smell_of urine', 'headache', 'high_fever', 'indigestion', 'joint_pain', 'knee_pain', 'lethargy', 'loss_of_appetite', 'mood_swings', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'patches_in_throat', 'pus_filled_pimples', 'shivering', 'skin_peeling', 'skin_rash', 'stiff_neck', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelling_joints', 'ulcers_on_tongue', 'vomiting', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 'yellowish_skin']

	app.get('/doctors', function(req, res){
		res.render('doctors', {user: req.session.userName, type: req.session.userType});
	});

	app.get('/docsign', function(req, res){
		res.render('doc_signup');
	});
};