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

const { answersToModel, getId } = require('../helper');
const { mail } = require('../helper/mail');
const authenticate = require('../helper/auth');

const { questions } = require('../data/questions');

const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const { Hits } = require('../models/miscellaneous');

const router = express.Router();

require('../helper/corona_data');

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
  const { latitude, longitude } = req.body;
	res.json({
    helpline: '011-23978046',
  });
});

/* Patient */
/**
 * Final assessment after initial interaction
 * of chatbot with given questions
 */
router.post('/assessment', (req, res) => {
	const { answers, timestamps, latitude, longitude, chat } = req.body;
	const oldPatient = answers['23'] == 0 ? null : getId(answers['24'], answers['25']);

	if (oldPatient) {
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
			res.json({
				connectToDoctor: true,
				patientId: _id,
				incomingChats: patient.chat,
				question: questions[questions.length - 1]
			});
		});
	} else {
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

				Patient.create(
					{
						_id: getId(name, telephone),
						...model,
						latitude,
						longitude,
						ip: req.headers['x-real-ip'] || req.ip,
						created_at: Date.now(),
						last_notified_at: Date.now() - 2000,
						chat_id: '',
						doctor: doc.username,
						last_messaged_at: Date.now(),
						chat: chat.slice(4)
					},
					(err, patient) => {
						if (err) {
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

						const { _id } = patient;

						req.session.patientId = patient;

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
/**
 * gives questions for pre assessment
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
				} else return question;
			}),
			incomingChats: [
				{
          statement: {
            en: 'Disclaimer: We collect your personal information such as name, age, phone number for registration purposes. We do not share this information with any other third party nor do we use it for commercial purposes. We may use your information for the purpose of our research and to create innovative and advanced services. We also use third party web analytics services such as Google Analytics which may collect information related to your use of this website.',
            hi: 'अस्वीकरण: हम आपकी व्यक्तिगत जानकारी जैसे नाम, आयु, फोन नंबर पंजीकरण के प्रयोजनों के लिए एकत्र करते हैं। हम इस जानकारी को किसी अन्य तीसरे पक्ष के साथ साझा नहीं करते हैं और न ही हम इसका उपयोग व्यावसायिक उद्देश्यों में करते हैं। हम आपकी जानकारी का उपयोग हमारे शोध के उद्देश्य और नवीन और उन्नत सेवाओं को बनाने के लिए कर सकते हैं। हम गूगल एनालिटिक्स जैसी थर्ड पार्टी वेब विश्लेषणात्मक सेवाओं का भी उपयोग करते हैं जो इस वेबसाइट के आपके उपयोग से संबंधित जानकारी एकत्र कर सकती हैं।',
            bn: 'দাবি অস্বীকার: আমরা আপনার ব্যক্তিগত তথ্য যেমন নাম, বয়স, নাম্বার জন্য ফোন নম্বর সংগ্রহ করি। আমরা এই তথ্যটি অন্য কোনও তৃতীয় পক্ষের সাথে ভাগ করি না বা আমরা বাণিজ্যিক উদ্দেশ্যে এটি ব্যবহার করি না। আমরা আপনার তথ্য আমাদের গবেষণার উদ্দেশ্যে এবং উদ্ভাবনী এবং উন্নত পরিষেবা তৈরি করতে ব্যবহার করতে পারি। আমরা তৃতীয় পক্ষের ওয়েব অ্যানালিটিক্স পরিষেবাদি যেমন গুগল অ্যানালিটিক্স ব্যবহার করি যা আপনার ওয়েবসাইটের ব্যবহার সম্পর্কিত তথ্য সংগ্রহ করতে পারে।'
          },
					type: 'incoming'
				},
				{
          statement: {
            en: 'We welcome you 👩‍⚕️',
            hi: 'आपका स्वागत है 👩‍⚕️',
            bn: 'আপনি স্বাগত জানাই 👩‍⚕️'
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
