const { stateVectorMap } = require('../data/fact-state-vector_mapping')
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/');
	},
	filename: function (req, file, cb) {
		const name = file.originalname.split('.');
		const customFileName = crypto.randomBytes(18).toString('hex');
		const extension = name[name.length - 1];
		cb(null, customFileName + '.' + extension);
	}
});
const upload = multer({ storage });

const { realTimeAnswersToModel, answersToModel, getId, computeAndReply } = require('../helper');
const { mail } = require('../helper/mail');
const authenticate = require('../helper/auth');
const { commands } = require('../data/commands');
const { TYPE_NONE, TYPE_ANALYSE } = require('../helper/values');

const { questions } = require('../data/questions');

const Patient = require('../models/patient');
const Session = require('../models/session');
const Doctor = require('../models/doctor');
const { Hits } = require('../models/miscellaneous');

const router = express.Router();

require('../helper/corona_data');
const { compute } = require("../compute/compute");

/* Common */
/**
 * Corona stats
 */
router.get('/cases', (req, res) => {
	fs.readFile(path.join(__dirname, '../data/cases.json'), 'utf8', (err, doc) => {
		if (err) return res.json({ err });
		res.json({
			...JSON.parse(doc)
		});
	});
});
/**
 * total website hits
 */
router.get('/hits', (req, res) => {
	Hits.findOneAndUpdate({}, { $inc: { hits: 1 } }, (err, result) => {
		if (err) return res.json({});
    let hits = 0;
    if (result) {
      hits = result.hits;
    }
		res.json({ hits });
	});
});
/**
 * upload any image
 * this is used in chat of doctor and patient.
 */
router.post('/image', upload.any(), (req, res) => {
	if (req.files.length) {
		const image = req.files[0];
		console.log(image);
		res.json({ image });
	} else {
		console.log("oh no");
		res.json({});
	}
});

/**
 * gives helpline numbers
 * TODO: Give number based on location
 */
router.post('/helpline', (req, res) => {
  // const { latitude, longitude } = req.body;
	res.json({
    helpline: '011-23978046',
  });
});

/* Patient */
/**
 * Final assessment after initial interaction of patient and chat bot with given questions.
 * Initiation of backend and frontend interaction
 * Pushes into DB after everything is done at the frontend
 * realtime() will gradually replace this or this will be called from backend in the future
 */
router.post('/assessment', (req, res) => {
	const { answers, timestamps, latitude, longitude, chat, session_id: conversation_session_id } = req.body;
	const oldPatient = (answers['23'] === 0 || answers['2.5'] !== 'undefined')
		? null : 																										// if new consultation : oldPatient = null
		getId(answers['24'], answers['25']);												// else oldPatient = name and phone entered
	console.log("assessment started")

	if (oldPatient) {
		// TODO : add sessions
		Patient.findById(oldPatient, (err, patient) => {
			if (err || !patient) {
				return res.json({
					incomingChats: [
						{
							statement: {
                en: 'We are unable to find your previous records 🙁',
                hi: 'हम आपके पिछले रिकॉर्ड नहीं ढूंढ पा रहे हैं 🙁',
                bn: 'আমরা আপনার আগের রেকর্ডগুলি সন্ধান করতে অক্ষম 🙁'
              },
							type: 'incoming'
						}
					]
				});
			}
			const { _id, doctor, name, telephone } = patient;
			mail(
				doctor,
				'Your Patient is Online',
				`Your patient ${name.toUpperCase()}, ${telephone}, has paid a visit, and is waiting for you.`
			);
			patient.conversation_sessions.push(conversation_session_id)
			res.json({
				connectToDoctor: true,
				patientId: _id,
				incomingChats: patient.chat,
				question: questions[questions.length - 1]
			});
		});
		// TODO : add self screening here and link to consultation. Save data before adding user
	} else {
		// new patient
		answersToModel(answers, timestamps, (model) => {
			const { name, telephone, hospital } = model;
			Doctor.findOne({ hospital }, (err, doc) => {
				if (err || !doc)
					return res.json({
						incomingChats: [
							{
                statement: {
                  en: 'We could not find any doctors 🙁',
                  hi: 'हम किसी भी डॉक्टर का पता नहीं लगा सके 🙁',
                  bn: 'আমরা কোনও ডাক্তার খুঁজে পাইনি 🙁'
                },
								type: 'incoming'
							}
						]
					});

				// Actual push into DB
				Patient.create(
					{
						_id: getId(name, telephone),
						...model,																			// data prepared through callback from answersToModel
						latitude,
						longitude,
						ip: req.headers['x-real-ip'] || req.ip,
						created_at: Date.now(),
						last_notified_at: Date.now() - 2000,
						chat_id: '',
						doctor: doc.username,
						last_messaged_at: Date.now(),
						chat: chat.slice(4),
						conversation_sessions: [conversation_session_id]
					},
					(err, patient) => {
						if (err) {
							// doctor not found
							console.error(err);
							return res.json({
								incomingChats: [
									{
                    statement: {
                      en: 'We could not find any doctors 🙁',
                      hi: 'हम किसी भी डॉक्टर का पता नहीं लगा सके 🙁',
                      bn: 'আমরা কোনও ডাক্তার খুঁজে পাইনি 🙁'
                    },
										type: 'incoming'
									}
								]
							});
						}

						// no error in patient creation - begin call

						const { _id } = patient;

						req.session.patientId = patient;

						patient.conversation_sessions.push(conversation_session_id)

						mail(
							doc.username,
							'Your Patient is Online',
							`Your patient ${name.toUpperCase()}, ${telephone}, has paid a visit, and is waiting for you.`
						);

						res.json({
							question: questions[questions.length - 1],
							patientId: _id,
							connectToDoctor: true,
							incomingChats: [
								{
                  statement: {
                    en: `Now you will speak with ${doc.name}`,
                    hi: `अब आप ${doc.name} से बात करेंगे,`,
                    bn: `এখন আপনি ${doc.name} এর সাথে কথা বলবেন,`
                  },
									type: 'incoming'
								}
							]
						});
					}
				);
			});
		});
	}
});

router.post('/realtime', (req, res) => {
	stateVectorMap()
	console.log("received realtime post request")
	const data = (req.body)
	let {
		answers,
		timestamps,
		chat,
		currentQuestion,
		answer,
		conversation_session_id,
		options,
		optionSelected,
		nextQuestion,
		answerFormat,
		patient_id,
		reset,
		duration
	} = data

	let command = currentQuestion.command

	// // console.log(data)
	console.debug("Log.d realtime post. session_id = ", conversation_session_id, '. nextQuestion = ', nextQuestion, '. answer = ', answer, '. currentQuestion = ', currentQuestion.id, '. command =', command, '. reset = ', reset)
	// console.debug("Log.d realtime post. session_id = ", conversation_session_id, '. nextQuestion = ', nextQuestion, '. answer = ', answer, '. currentQuestion = ', currentQuestion.id, '. command =', command, '. answerFormat = ', answerFormat)
	// console.log("optionSelected = ", optionSelected)
	// // console.log("answer = ", answer)
	// console.log('answers = ', answers)
	// console.log('timestamps = ', timestamps)
	// console.log('question = ', question)
	// console.log('chat = ', chat)

	const message = {
		statement: "stxatement",
		messageType: "txypeX",
		direction: "direxction",
		answerFormat: answerFormat,
		nextQuestion: nextQuestion,
		optionSelected: optionSelected,
		options: options,
		currentQuestion: currentQuestion,
		timestamp: Date.now(),
		patient_id: patient_id,
		replyDuration: duration
	}

	// TODO somewhere call RealTimeAnswersToModel
	// if (!Session.exists({ _id: session_id })) {
	Session.create(
		{
			_id: conversation_session_id,
			patient_id: patient_id
		},
		(err, session) => {
			if (err) {

				console.debug('failed to create session in mongo - ' + err)
				console.log("err type = ", typeof err)
				// console.log("err instance = ", instanceof err)

				// Session.findOneAndUpdate({ _id: session_id }, update )

				Session.findOne({_id:conversation_session_id}, (err, sess) => {
					if (err) {
						console.error("WTF", err)
						// nothing done
						return res;
					}
					// old session
					console.log('old session')
					console.log('adding message to DB')
					// push into old session
					sess.messages.push(message)
					sess.save()
					res = compute(sess, res, currentQuestion, answers, nextQuestion, options, false, command, reset, patient_id, duration)
					if (res === undefined) console.error('result is null or undefined')
					return res
				})
				// // Todo create result
				// console.log('new session, preparing result')
				// // computeAndReply()
				// console.log(getQuestionById(questions, nextQuestion))
				// // set res
				// res.json({
				// 	"none": "none",
				// 	question: getQuestionById(questions, nextQuestion),
				// 	incomingChats: [{ statement: { none: "none" }, type: "incoming" }]
				// });
				return res
			}
			console.log('new session created, pushing into DB')
			// push into new session
			console.log("session = ", session, ". message = ", message, ". session.messages = ", session.messages)
			// update session
			session.messages.push(message)
			session.save()

			console.log('starting chat for new session')
			// begin computation and get result
			res = compute(session, res, currentQuestion, answers, nextQuestion, null, true, command, reset, patient_id, duration)
			return res
		})
});

/**
 * Payment and disclaimer. Chat opening
 */
router.get('/questions', (req, res) => {
	/* TODO: doctor's availability status and welcome message */
	Doctor.find({}, (err, doctors) => {
		if (err || !doctors) return res.json({});

		let hospitals = [];
		let paymentDetails = []; // Associated with hospitals array indexes
		doctors.map((doctor) => {
			if (!hospitals.includes(doctor.hospital)) {
				hospitals.push(doctor.hospital);
				if (doctor.upi_id && doctor.fees) {
					paymentDetails.push("UPI: " + doctor.upi_id + " - Fees: " + doctor.fees + "/-");
				} else {
					paymentDetails.push("");
				}
			}
			return doctor;
		});

		res.json({
			/**
			 * the 'choose hospital' question
			 * has to be given options of hospitals dynamically
			 */
			questions: questions.map((question) => {
				if (question.id === 26) {
					return {
						...question,
						options: hospitals.map((hospital, index) => {
							let paymentDetail = paymentDetails[index] ? " - " + paymentDetails[index] : "";
							return {
								nextQuestion: hospital === 'AIIMS Jodhpur' ? 27 : 26.1,
								value: index,
                statement: {
                  en: hospital + paymentDetail,
                  hi: hospital + paymentDetail,
                  bn: hospital + paymentDetail
                },
								dbValue: hospital
							};
						})
					};
				} else if (typeof question.id=="string") {
					return question;
				} else return question;
			}),
			incomingChats: [
				{
          statement: {
            en: 'We welcome you 🙏👩‍⚕️',
            hi: 'आपका स्वागत है 🙏👩‍⚕️',
            bn: 'আপনি স্বাগত জানাই 🙏👩‍⚕️'
          },
					type: 'incoming'
				}
			]
		});
	});
});

/* Doctor */
/**
 * Provides patient list for doctor's interface
 */
router.get('/patient-list', authenticate, (req, res) => {
	const { page } = req.query;
	const pageSize = 30;
	const { username: doctor } = req.user;
	Patient.find(
		{ doctor },
		{ chat: 0, last_notified_at: 0, __v: 0, chat_id: 0 },
		{
			limit: pageSize,
			skip: pageSize * Math.max(0, page - 1),
			sort: {
				last_messaged_at: -1
			}
		},
		(err, patients) => {
			if (err) return res.json({ error: true });
			res.json({
				patients: patients.map(({ _doc: patient }) => {
					const { created_at, last_messaged_at } = patient;
					delete patient['created_at'];
					delete patient['last_messaged_at'];
					patient['Last Visited'] = new Date(last_messaged_at).toLocaleString();
					patient['Registered'] = new Date(created_at).toLocaleString();
					return patient;
				})
			});
		}
	);
});

/**
 * Used by doctor to get other doctors
 * of the same hospital he can refer the same patient to
 */
router.get('/doctor-list', authenticate, (req, res) => {
	const { hospital, username } = req.user;
	Doctor.find({ hospital, username: { $ne: username } }, (err, doctors) => {
		if (err) return res.json({ error: true });
		res.json({
			doctors
		});
	});
});
/**
 * doctors logout
 */
router.get('/logout', authenticate, (req, res) => {
	// req.session.destroy();
	req.session.username = null;
	res.json({ loggedOut: true });
});

/**
 * doctors login
 */
router.post('/login', authenticate, (req, res) => {
	const { username, hospital } = req.user;
	res.json({ login: true, username, hospital });
});

module.exports = router;
