const mongoose = require('mongoose');

const { Schema } = mongoose;

const Chat = new Schema({
	statement: String,
	type: String
});

const Timestamps = new Schema({
	time: Number,
	id: String
});

// create a schema
const PatientSchema = new Schema(
	{
		/**
		 * calcutaed by name-telephone
		 * ex. name:- KuNaL TAwAtia
		 * 		 tel:- 1234567890
		 * => id:- kunal-1234567890
		 */
		_id: {
			type: String,
			unique: true,
			required: true
		},
		conversation_sessions: [String],

		SPO2_value: String,
		Pulserate: String,
		BP_value: String,
		Temperature_value: String,
		Bloodglucose_taken_at: String,
		Bloodglucose_value: String,
		/**
		Vital parameters reading
		*/


		HRCT_report: String,
		CRP_report: String,
		IL6_report: String,
		D_dimer_report: String,
		Ferritinin_report: String,
	  Procalcitonin_report: String,
		KFT_report: String,
		/**
		Pathological reports
		*/


		Covid19_when: {
			type: String,
			required: false,
			default: 'NA'
		},
		Hospitalization_during_covid: {
			type: String,
			required: false,
			default: 'NA'
		},
		duration_hospitalization: {
			type: String,
			required: false,
			default: 'NA'
		},
		steroids_given_duringstay: {
			type: String,
			required: false,
			default: 'NA'
		},
		oxygen_support_duringstay: {
			type: String,
			required: false,
			default: 'NA'
		},
		steroids_taken: {
			type: String,
			required: false,
			default: 'NA'
		},
		discoloration_upper_palette: {
			type: String,
			required: false,
			default: 'NA'
		},
		swelling_upper_pallette: {
			type: String,
			required: false,
			default: 'NA'
		},
		can_close_eyes: {
			type: String,
			required: false,
			default: 'NA'
		},
		can_feel_nose_and_cheek: {
			type: String,
			required: false,
			default: 'NA'
		},
		symptoms: [],
		vaccination_status: String,
		symptomatic_forcovid: Boolean,

		/*
		 * Cardiac screening
		 */
		chest_pain: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_point_chest_pain: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_score: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_left_arm_pain: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_left_arm_pain_inside: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_arm_movement_pain: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_arm_pressure_pain: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_sweating: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_breathlessness: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_fatigue: {
			type: String,
			required: false,
			default: 'NA'
		},
		angina: {
			type: String,
			required: false,
			default: 'NA'
		},
		cardiac_exertion: {
			type: String,
			required: false,
			default: 'NA'
		},
		angina_episodes: {
			type: String,
			required: false,
			default: 'NA'
		},
		unstable_angina: {
			type: String,
			required: false,
			default: 'NA'
		},

		/**
		 * based on AIIMS delhi guidelines
		 * pre-assessment of patient is assessed
		 * if (s)he is a COVID-19 suspect
		 * According to age range
		 */
		symptomatic_formucormycosis: Boolean, /** from the current symptoms*/
		/**
		 * additional symptom information
		 * provided by patient* under covid-19 consultancy
		 */
		additional_symptoms: String,
		name: String,
		email: String,
		telephone: String,
		gender: String,
		age: String,
		Profession: String,
		latitude: Number,
		longitude: Number,
		ip: String,
		/**
		 * patient registered at
		 */
		created_at: Number,
		/**
		 * records time patient last messaged at
		 * it is used in deciding the last active time of patient
		 */
		last_messaged_at: Number,
		/**
		 * time on which the patient was last emailed
		 * for a message from doctor
		 */
		last_notified_at: Number,
		/**
		 * this contains the socket id of patient while chatting
		 * it is used by IO to emit events.
		 */
		chat_id: {
			type: String,
			default: ''
		},
		/**
		 * doctor he is presently seeking
		 * this field changes only at referral
		 */
		doctor: String,
		hospital: String,
		aiims_id: String,
		/**
		 * value is either "OPD" or "COVID-19"
		 */
		type: String,
		opd_symptoms: String,
		opd_symptoms_age: String,
		timestamps: [Timestamps],
		chat: [Chat]
	},
	{ _id: false }
);

// create the model
const Patient = mongoose.model('Patient', PatientSchema, 'patients');

// export the model
module.exports = Patient;
