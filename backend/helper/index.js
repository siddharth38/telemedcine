const {
  questions
} = require('../data/questions');
const Doctor = require('../models/doctor');

function getDbValue(questionIndex, dbQuestionIndex, answers) {
  try {
    if (answers && answers[questionIndex + ''] === '0') {
      if (answers[dbQuestionIndex + ''] !== undefined) {
        return (
          getQuestionById(dbQuestionIndex).options[answers[dbQuestionIndex + '']].dbValue || ''
        );
      } else return '';
    } else return '';
  } catch (err) {
    return '';
  }
}

function getQuestionById(id) {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id === id) {
      return questions[i];
    }
  }
  return null;
}

function getId(name, number) {
  const cleansedName = name.trim();
  if (cleansedName) {
    return `${cleansedName.split(' ')[0]}-${number}`.toLowerCase();
  }
  return null;
}

function answersToModel(answers, callback) {
  if (!answers) {
    callback({});
  } else {
    Doctor.find().distinct('hospital', (err, hospitals) => {
      if (err || !hospitals) return callback({});
      hospital = hospitals[answers['4']];
      aiims_id = hospital === 'AIIMS Jodhpur' ? answers['6'] : '';

      type = getQuestionById(7).options[answers['7']].dbValue;

      if (type === 'OPD') {
        opd_symptoms = answers['2.4'];
        opd_symptoms_age = answers['2.41'];
        name = answers['2.5'];
        gender = getQuestionById(2.7).options[answers['2.7']].dbValue;
        age = answers['2.6'];
        email = answers['2.9'] === '0' ? answers['2.91'] : '';
        telephone = answers['2.8'];
        callback({
          name,
          age,
          gender,
          telephone,
          email,
          hospital,
          type,
          opd_symptoms,
          opd_symptoms_age,
          aiims_id
        });
      } else {

        name = answers['8'];
        gender = getQuestionById(11).options[answers['11']].dbValue;
        age = answers['10'];
        email = answers['12'] == '0' ? answers['13'] : '';
        telephone = answers['9'];
        shortness_of_breath = getQuestionById(63).options[answers['63']].dbValue;
        BP_value = answers['14'] == '0' ? answers['15'] : 'NA';
        SPO2_value = answers['16'] == '0' ? answers['17'] : 'NA';
        Temperatue_value = answers['19'] == '0' ? answers['20'] : 'NA';
        Bloodglucosevaluetakenat = answers['21'] == '0' ? getQuestionById(22).options[answers['22']].dbValue : 'NA';
        Bloodglucose_value = answers['21'] == '0' ? answers['23'] : 'NA';
        HRCT_status = answers['40'] == '0' ? getQuestionById(41).options[answers['41']].dbValue : 'NA';
        CO_RADS_status = answers['43'] == '0' ? getQuestionById(44).options[answers['44']].dbValue : 'NA';
        CRP_status = answers['46'] == '0' ? getQuestionById(47).options[answers['47']].dbValue : 'NA';
        IL6_status = answers['49'] == '0' ? getQuestionById(50).options[answers['50']].dbValue : 'NA';
        D_dimer_status = answers['52'] == '0' ? getQuestionById(53).options[answers['53']].dbValue : 'NA';
        change_in_smell = getQuestionById(31).options[answers['31']].dbValue;
        change_in_taste = getQuestionById(32).options[answers['32']].dbValue;
        vaccination_status = answers['55'] == '0' ? getQuestionById(56).options[answers['56']].dbValue : 'NA';
        fever = getQuestionById(24).options[answers['24']].dbValue;
        sore_throat = getQuestionById(25).options[answers['25']].dbValue;
        cough = getQuestionById(26).options[answers['26']].dbValue;
        diarrhea = getQuestionById(27).options[answers['27']].dbValue;
        bodyache = getQuestionById(28).options[answers['28']].dbValue;
        lethargic = getQuestionById(29).options[answers['29']].dbValue;
        giddiness = getQuestionById(30).options[answers['30']].dbValue;
        facial_black_spots = getQuestionById(33).options[answers['33']].dbValue;
        facial_swelling = getQuestionById(34).options[answers['34']].dbValue;
        numbness = getQuestionById(35).options[answers['35']].dbValue;
        tingling = getQuestionById(36).options[answers['36']].dbValue;
        any_sensation = getQuestionById(37).options[answers['37']].dbValue;
        additional_symptoms = answers['39'];

        symptomatic_forcovid = (fever && true) || (cough && true) || (shortness_of_breath && true) || (sore_throat && true) || (diarrhea && true) || (bodyache && true) || (lethargic && true) || (giddiness && true) || false;
        symptomatic_forblackfungus = (facial_black_spots && true) || (facial_swelling && true) || (numbness && true) || (tingling && true) || (any_sensation && true) || false;
        Serious = (HRCT_status === 'Severe') || (CO_RADS_status === 'Very High' || CO_RADS_status === 'Very High with PCR+') ||
          (CRP_status === 'Severe') || (IL6_status === 'Severe' || IL6_status === 'Critical') ||
          (D_dimer_status === 'Moderate-Severe') || false

					callback({
						name,
						age,
						gender,
						telephone,
						email,
						hospital,
						type,
						SPO2_value,
						BP_value,
						Temperatue_value,
						Bloodglucosevaluetakenat,
						Bloodglucose_value,
						HRCT_status,
						CO_RADS_status,
						CRP_status,
						IL6_status,
						D_dimer_status,
						change_in_smell,
						change_in_taste,
						fever,
						sore_throat,
						cough,
						diarrhea,
						bodyache,
						lethargic,
						giddiness,
						shortness_of_breath,
						facial_black_spots,
						facial_swelling,
						numbness,
						tingling,
						any_sensation,
						vaccination_status,
						additional_symptoms,
						symptomatic_forcovid,
						symptomatic_forblackfungus,
						Serious,
					});
      }
    });
  }
}

module.exports = {
  getId,
  answersToModel
};
