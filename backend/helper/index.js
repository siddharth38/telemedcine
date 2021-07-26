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

function answersToModel(answers, timestamps, callback) {
  if (!answers) {
    callback({});
  } else {
    Doctor.find().distinct('hospital', (err, hospitals) => {
      if (err || !hospitals) return callback({});
      hospital = hospitals[answers['26']];
      aiims_id = hospital === 'AIIMS Jodhpur' ? answers['27'] : '';

      type = getQuestionById(28).options[answers['28']].dbValue;

      let modelTimestamps = [];

      if (type === 'OPD') {
        opd_symptoms = answers['2.4'];
        modelTimestamps.push({ id: 'opd_symptoms', time: timestamps['2.4']});
        opd_symptoms_age = answers['2.41'];
        modelTimestamps.push({ id: 'opd_symptoms_age', time: timestamps['2.41']});
        name = answers['2.5'];
        modelTimestamps.push({ id: 'name', time: timestamps['2.5']});
        gender = getQuestionById(2.7).options[answers['2.7']].dbValue;
        modelTimestamps.push({ id: 'gender', time: timestamps['2.7']});
        age = answers['2.6'];
        modelTimestamps.push({ id: 'age', time: timestamps['2.6']});
        email = answers['2.9'] === '0' ? answers['2.91'] : '';
        modelTimestamps.push({ id: 'email', time: timestamps['2.9']});
        telephone = answers['2.8'];
        modelTimestamps.push({ id: 'telephone', time: timestamps['2.8']});
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
          aiims_id,
          'timestamps': modelTimestamps
        });
      }
      else if (answers['1'] == "1" && (typeof answers['22'] != 'undefined')) {
        console.log(answers['4']);
        canfeelnoseandcheek = answers['4'] == '0' ? 'Yes':'No';
        modelTimestamps.push({ id: 'canfeelnoseandcheek', time: timestamps['53']});
        cancloseeyes = answers['6'] == '0' ? 'Yes':'No';
        modelTimestamps.push({ id: 'cancloseeyes', time: timestamps['53']});
        swellingupperpallette =  answers['8'] == '0' ? 'Yes':'No';
        modelTimestamps.push({ id: 'swellingupperpallette', time: timestamps['53']});
        discolorationupperpalette =  answers['9'] == '0' ? 'Yes':'No';
        modelTimestamps.push({ id: 'discolorationupperpalette', time: timestamps['53']});
        name = answers['29'];
		modelTimestamps.push({ id: 'name', time: timestamps['29']});
        gender = getQuestionById(32).options[answers['32']].dbValue;
		modelTimestamps.push({ id: 'gender', time: timestamps['32']});
        age = answers['31'];
		modelTimestamps.push({ id: 'age', time: timestamps['31']});
        email = answers['33'] == '0' ? answers['34'] : '';
		modelTimestamps.push({ id: 'email', time: timestamps['33']});
        Profession = getQuestionById(34.1).options[answers['34.1']].dbValue;
		modelTimestamps.push({ id: 'Profession', time: timestamps['34.1']});
		telephone = answers['30'];
		modelTimestamps.push({ id: 'telephone', time: timestamps['30']});
        covid19_before = answers['35'];
		modelTimestamps.push({ id: 'covid19_before', time: timestamps['35']});
		BP_value = answers['36'] == '0' ? answers['37'] : 'NA';
		modelTimestamps.push({ id: 'BP_value', time: timestamps['36']});
        SPO2_value = answers['38'] == '0' ? answers['39'] : 'NA';
		modelTimestamps.push({ id: 'SPO2_value', time: timestamps['38']});
		Pulserate = answers['38'] == '0' ? answers['40'] : 'NA';
		modelTimestamps.push({ id: 'Pulserate', time: timestamps['38']});
        Temperatue_value = answers['41'] == '0' ? answers['42'] : 'NA';
		modelTimestamps.push({ id: 'Temperature_value', time: timestamps['41']});
        Bloodglucosevaluetakenat = answers['43'] == '0' ? getQuestionById(44).options[answers['44']].dbValue : 'NA';
		modelTimestamps.push({ id: 'Bloodglucosevaluetakenat', time: timestamps['43']});
        Bloodglucose_value = answers['43'] == '0' ? answers['45'] : 'NA';
		modelTimestamps.push({ id: 'Bloodglucose_value', time: timestamps['43']});
		Covid19_when = answers['35'] == '0' ? getQuestionById(46).options[answers['46']].dbValue: '';
		modelTimestamps.push({ id: 'Covid19_when', time: timestamps['35']});
		Hospitalization_during_covid = answers['35'] == '0' ? getQuestionById(47).options[answers['47']].dbValue: '';
		modelTimestamps.push({ id: 'Hospitalization_during_covid', time: timestamps['35']});
    	// console.log(answers);
		if (answers['47'] == '1'){
		steroids_taken = answers['35'] == '0' ? getQuestionById(47).options[answers['47']].dbValue: '';
		modelTimestamps.push({ id: 'steroids_taken', time: timestamps['35']});
		oxygen_support_duringcovid = getQuestionById(49).options[answers['49']].dbValue;
		modelTimestamps.push({ id: 'oxygen_support_duringcovid', time: timestamps['49']});
        currenthealth = answers['50'];
		modelTimestamps.push({ id: 'currenthealth', time: timestamps['50']});
		HRCT_report = answers['51'] && answers['51'].includes('0') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'HRCT_report', time: timestamps['51']});
        CRP_report = answers['51'] && answers['51'].includes('1') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'CRP_report', time: timestamps['51']});
        IL6_report = answers['51'] && answers['51'].includes('2') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'IL6_report', time: timestamps['51']});
        Ddimer_report = answers['51'] && answers['51'].includes('3') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ddimer_report', time: timestamps['51']});
        Ferritinin_report = answers['51'] && answers['51'].includes('4') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ferritinin_report', time: timestamps['51']});
        Procalcitonin_report = answers['51'] && answers['51'].includes('5') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Procalcitonin_report', time: timestamps['51']});
		KFT_report = answers['51'] && answers['51'].includes('6') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'KFT_report', time: timestamps['51']});
		symptoms1 = !answers['53'].includes('None of the listed') ? answers['53'] : [];
		symptoms2 = answers['55'] && !answers['55'].includes('None of the listed') ? answers['55'] : [];
		symptoms3 = answers['56'] && !answers['56'].includes('None of the listed') ? answers['56'] : [];
		symptoms4 = answers['57'] && !answers['57'].includes('None of the listed') ? answers['57'] : [];
		symptoms5 = answers['59'] && !answers['59'].includes('None of the listed') ? answers['59'] : [];
		symptoms6 = answers['60'] && !answers['60'].includes('None of the listed')  ? answers['60'] : [];
		symptoms7 = answers['61'] && !answers['61'].includes('None of the listed') ? answers['61'] : [];
        additional_symptoms = answers['63'];
		modelTimestamps.push({ id: 'additional_symptoms', time: timestamps['63']});
		vaccination_status = answers['64'] == '0' ? getQuestionById(65).options[answers['65']].dbValue : 'NA';
		modelTimestamps.push({ id: 'vaccination_status', time: timestamps['65']});

    symptomatic_forcovid = (typeof answers['56'] != 'undefined') || (typeof answers['60'] != 'undefined') || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
	modelTimestamps.push({ id: 'symptomatic_forcovid', time: timestamps['53']});
    symptomatic_formucormycosis = (typeof answers['55'] != 'undefined') || (typeof answers['59'] != 'undefined') || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
	modelTimestamps.push({ id: 'symptomatic_formucormycosis', time: timestamps['53']});
        symptoms = symptoms1;
		symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
						...symptoms5, ...symptoms6, ...symptoms7);
						modelTimestamps.push({ id: 'symptoms', time: timestamps['53']});

					callback({
						name,
						age,
						gender,
						telephone,
						email,
						Profession,
						hospital,
						type,
						SPO2_value,
						Pulserate,
						BP_value,
						Temperatue_value,
						Bloodglucosevaluetakenat,
						Bloodglucose_value,
						Covid19_when,
						Hospitalization_during_covid,
						steroids_taken,
						oxygen_support_duringcovid,
						HRCT_report,
						CRP_report,
						IL6_report,
						Ddimer_report,
						Ferritinin_report,
						Procalcitonin_report,
						KFT_report,
						symptomatic_forcovid,
						symptomatic_formucormycosis,
            canfeelnoseandcheek,
            cancloseeyes,
            swellingupperpallette,
            discolorationupperpalette,
						symptoms,
						vaccination_status,
						additional_symptoms,
            timestamps: modelTimestamps,
					});

		}
		else if (answers['47'] == '0'){
      canfeelnoseandcheek = answers['4'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'canfeelnoseandcheek', time: timestamps['53']});
      cancloseeyes = answers['6'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'cancloseeyes', time: timestamps['53']});
      swellingupperpallette =  answers['8'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'swellingupperpallette', time: timestamps['53']});
      discolorationupperpalette =  answers['9'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'discolorationupperpalette', time: timestamps['53']});
		duration_hospitalization = getQuestionById(67).options[answers['67']].dbValue;
		modelTimestamps.push({ id: 'duration_hospitalization', time: timestamps['67']});
		steroids_given_duringstay = getQuestionById(68).options[answers['68']].dbValue;
		modelTimestamps.push({ id: 'steroids_given_duringstay', time: timestamps['68']});
		oxygen_support_duringstay = getQuestionById(69).options[answers['69']].dbValue;
		modelTimestamps.push({ id: 'oxygen_support_duringstay', time: timestamps['69']});
        currenthealth = answers['50'];
		modelTimestamps.push({ id: 'currenthealth', time: timestamps['50']});
		HRCT_report = answers['51'] && answers['51'].includes('0') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'HRCT_report', time: timestamps['51']});
        CRP_report = answers['51'] && answers['51'].includes('1') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'CRP_report', time: timestamps['51']});
        IL6_report = answers['51'] && answers['51'].includes('2') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'IL6_report', time: timestamps['51']});
        Ddimer_report = answers['51'] && answers['51'].includes('3') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ddimer_report', time: timestamps['51']});
        Ferritinin_report = answers['51'] && answers['51'].includes('4') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ferritinin_report', time: timestamps['51']});
        Procalcitonin_report = answers['51'] && answers['51'].includes('5') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Procalcitonin_report', time: timestamps['51']});
		KFT_report = answers['51'] && answers['51'].includes('6') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'KFT_report', time: timestamps['51']});
		symptoms1 = !answers['53'].includes('None of the listed') ? answers['53'] : [];
		symptoms2 = answers['55'] && !answers['55'].includes('None of the listed') ? answers['55'] : [];
		symptoms3 = answers['56'] && !answers['56'].includes('None of the listed') ? answers['56'] : [];
		symptoms4 = answers['57'] && !answers['57'].includes('None of the listed') ? answers['57'] : [];
		symptoms5 = answers['59'] && !answers['59'].includes('None of the listed') ? answers['59'] : [];
		symptoms6 = answers['60'] && !answers['60'].includes('None of the listed')  ? answers['60'] : [];
		symptoms7 = answers['61'] && !answers['61'].includes('None of the listed') ? answers['61'] : [];
        additional_symptoms = answers['63'];
		modelTimestamps.push({ id: 'additional_symptoms', time: timestamps['63']});
		vaccination_status = answers['64'] == '0' ? getQuestionById(65).options[answers['65']].dbValue : 'NA';
		modelTimestamps.push({ id: 'vaccination_status', time: timestamps['64']});

    symptomatic_forcovid = (typeof answers['56'] != 'undefined') || (typeof answers['60'] != 'undefined') || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
	modelTimestamps.push({ id: 'symptomatic_forcovid', time: timestamps['53']});
    symptomatic_formucormycosis = (typeof answers['55'] != 'undefined') || (typeof answers['59'] != 'undefined') || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
	modelTimestamps.push({ id: 'symptomatic_formucormycosis', time: timestamps['53']});
        symptoms = symptoms1;
		symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
						...symptoms5, ...symptoms6, ...symptoms7);
						modelTimestamps.push({ id: 'symptoms', time: timestamps['53']});

					callback({
						name,
						age,
						gender,
						telephone,
						email,
						Profession,
						hospital,
						type,
						SPO2_value,
						Pulserate,
						BP_value,
						Temperatue_value,
						Bloodglucosevaluetakenat,
						Bloodglucose_value,
						Covid19_when,
						Hospitalization_during_covid,
						duration_hospitalization,
						steroids_given_duringstay,
						oxygen_support_duringstay,
						HRCT_report,
						CRP_report,
						IL6_report,
						Ddimer_report,
						Ferritinin_report,
						Procalcitonin_report,
						KFT_report,
						symptomatic_forcovid,
						symptomatic_formucormycosis,
            canfeelnoseandcheek,
            cancloseeyes,
            swellingupperpallette,
            discolorationupperpalette,
						symptoms,
						vaccination_status,
						additional_symptoms,
            timestamps: modelTimestamps,
					});
		}
    else {
      canfeelnoseandcheek = answers['4'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'canfeelnoseandcheek', time: timestamps['53']});
      cancloseeyes = answers['6'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'cancloseeyes', time: timestamps['53']});
      swellingupperpallette =  answers['8'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'swellingupperpallette', time: timestamps['53']});
      discolorationupperpalette =  answers['9'] == '0' ? 'Yes':'No';
      modelTimestamps.push({ id: 'discolorationupperpalette', time: timestamps['53']});
      currenthealth = answers['50'];
	  modelTimestamps.push({ id: 'currenthealth', time: timestamps['50']});
		HRCT_report = answers['51'] && answers['51'].includes('0') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'HRCT_report', time: timestamps['51']});
        CRP_report = answers['51'] && answers['51'].includes('1') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'CRP_report', time: timestamps['51']});
        IL6_report = answers['51'] && answers['51'].includes('2') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'IL6_report', time: timestamps['51']});
        Ddimer_report = answers['51'] && answers['51'].includes('3') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ddimer_report', time: timestamps['51']});
        Ferritinin_report = answers['51'] && answers['51'].includes('4') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ferritinin_report', time: timestamps['51']});
        Procalcitonin_report = answers['51'] && answers['51'].includes('5') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Procalcitonin_report', time: timestamps['51']});
		KFT_report = answers['51'] && answers['51'].includes('6') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'KFT_report', time: timestamps['51']});
		symptoms1 = !answers['53'].includes('None of the listed') ? answers['53'] : [];
		symptoms2 = answers['55'] && !answers['55'].includes('None of the listed') ? answers['55'] : [];
		symptoms3 = answers['56'] && !answers['56'].includes('None of the listed') ? answers['56'] : [];
		symptoms4 = answers['57'] && !answers['57'].includes('None of the listed') ? answers['57'] : [];
		symptoms5 = answers['59'] && !answers['59'].includes('None of the listed') ? answers['59'] : [];
		symptoms6 = answers['60'] && !answers['60'].includes('None of the listed')  ? answers['60'] : [];
		symptoms7 = answers['61'] && !answers['61'].includes('None of the listed') ? answers['61'] : [];
        additional_symptoms = answers['63'];
		modelTimestamps.push({ id: 'additional_symptoms', time: timestamps['63']});
		vaccination_status = answers['64'] == '0' ? getQuestionById(65).options[answers['65']].dbValue : 'NA';
		modelTimestamps.push({ id: 'vaccination_status', time: timestamps['65']});

    symptomatic_forcovid = (typeof answers['56'] != 'undefined') || (typeof answers['60'] != 'undefined') || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
	modelTimestamps.push({ id: 'symptomatic_forcovid', time: timestamps['53']});
    symptomatic_formucormycosis = (typeof answers['55'] != 'undefined') || (typeof answers['59'] != 'undefined') || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
	modelTimestamps.push({ id: 'symptomatic_formucormycosis', time: timestamps['53']});
        symptoms = symptoms1;
		symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
						...symptoms5, ...symptoms6, ...symptoms7);
						modelTimestamps.push({ id: 'symptoms', time: timestamps['53']});

        callback({
          name,
          age,
          gender,
          telephone,
          email,
          Profession,
          hospital,
          type,
          SPO2_value,
          Pulserate,
          BP_value,
          Temperatue_value,
          Bloodglucosevaluetakenat,
          Bloodglucose_value,
          HRCT_report,
          CRP_report,
          IL6_report,
          Ddimer_report,
          Ferritinin_report,
          Procalcitonin_report,
          KFT_report,
          symptomatic_forcovid,
          symptomatic_formucormycosis,
          canfeelnoseandcheek,
          cancloseeyes,
          swellingupperpallette,
          discolorationupperpalette,
          symptoms,
          vaccination_status,
          additional_symptoms,
          timestamps: modelTimestamps,
        });

    }
// console.log(symptomatic_forcovid, symptomatic_formucormycosis)
      }
      else {
        name = answers['29'];
		modelTimestamps.push({ id: 'name', time: timestamps['29']});
        gender = getQuestionById(32).options[answers['32']].dbValue;
		modelTimestamps.push({ id: 'gender', time: timestamps['32']});
        age = answers['31'];
		modelTimestamps.push({ id: 'age', time: timestamps['31']});
        email = answers['33'] == '0' ? answers['34'] : '';
		modelTimestamps.push({ id: 'email', time: timestamps['33']});
        Profession = getQuestionById(34.1).options[answers['34.1']].dbValue;
		modelTimestamps.push({ id: 'Profession', time: timestamps['34.1']});
		telephone = answers['30'];
		modelTimestamps.push({ id: 'telephone', time: timestamps['30']});
        covid19_before = answers['35'];
		modelTimestamps.push({ id: 'covid19_before', time: timestamps['35']});
		BP_value = answers['36'] == '0' ? answers['37'] : 'NA';
		modelTimestamps.push({ id: 'BP_value', time: timestamps['36']});
        SPO2_value = answers['38'] == '0' ? answers['39'] : 'NA';
		modelTimestamps.push({ id: 'SPO2_value', time: timestamps['38']});
		Pulserate = answers['38'] == '0' ? answers['40'] : 'NA';
		modelTimestamps.push({ id: 'Pulserate', time: timestamps['38']});
        Temperatue_value = answers['41'] == '0' ? answers['42'] : 'NA';
		modelTimestamps.push({ id: 'Temperature_value', time: timestamps['41']});
        Bloodglucosevaluetakenat = answers['43'] == '0' ? getQuestionById(44).options[answers['44']].dbValue : 'NA';
		modelTimestamps.push({ id: 'Bloodglucosevaluetakenat', time: timestamps['43']});
        Bloodglucose_value = answers['43'] == '0' ? answers['45'] : 'NA';
		modelTimestamps.push({ id: 'Bloodglucose_value', time: timestamps['43']});
		Covid19_when = answers['35'] == '0' ? getQuestionById(46).options[answers['46']].dbValue: '';
		modelTimestamps.push({ id: 'Covid19_when', time: timestamps['35']});
		Hospitalization_during_covid = answers['35'] == '0' ? getQuestionById(47).options[answers['47']].dbValue: '';
		modelTimestamps.push({ id: 'Hospitalization_during_covid', time: timestamps['35']});
    	// console.log(answers);
		if (answers['47'] == '1'){
		steroids_taken = answers['35'] == '0' ? getQuestionById(47).options[answers['47']].dbValue: '';
		modelTimestamps.push({ id: 'steroids_taken', time: timestamps['35']});
		oxygen_support_duringcovid = getQuestionById(49).options[answers['49']].dbValue;
		modelTimestamps.push({ id: 'oxygen_support_duringcovid', time: timestamps['49']});
        currenthealth = answers['50'];
		modelTimestamps.push({ id: 'currenthealth', time: timestamps['50']});
		HRCT_report = answers['51'] && answers['51'].includes('0') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'HRCT_report', time: timestamps['51']});
        CRP_report = answers['51'] && answers['51'].includes('1') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'CRP_report', time: timestamps['51']});
        IL6_report = answers['51'] && answers['51'].includes('2') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'IL6_report', time: timestamps['51']});
        Ddimer_report = answers['51'] && answers['51'].includes('3') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ddimer_report', time: timestamps['51']});
        Ferritinin_report = answers['51'] && answers['51'].includes('4') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ferritinin_report', time: timestamps['51']});
        Procalcitonin_report = answers['51'] && answers['51'].includes('5') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Procalcitonin_report', time: timestamps['51']});
		KFT_report = answers['51'] && answers['51'].includes('6') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'KFT_report', time: timestamps['51']});
		symptoms1 = !answers['53'].includes('None of the listed') ? answers['53'] : [];
		symptoms2 = answers['55'] && !answers['55'].includes('None of the listed') ? answers['55'] : [];
		symptoms3 = answers['56'] && !answers['56'].includes('None of the listed') ? answers['56'] : [];
		symptoms4 = answers['57'] && !answers['57'].includes('None of the listed') ? answers['57'] : [];
		symptoms5 = answers['59'] && !answers['59'].includes('None of the listed') ? answers['59'] : [];
		symptoms6 = answers['60'] && !answers['60'].includes('None of the listed')  ? answers['60'] : [];
		symptoms7 = answers['61'] && !answers['61'].includes('None of the listed') ? answers['61'] : [];
        additional_symptoms = answers['63'];
		modelTimestamps.push({ id: 'additional_symptoms', time: timestamps['63']});
		vaccination_status = answers['64'] == '0' ? getQuestionById(65).options[answers['65']].dbValue : 'NA';
		modelTimestamps.push({ id: 'vaccination_status', time: timestamps['65']});

    symptomatic_forcovid = (typeof answers['56'] != 'undefined') || (typeof answers['60'] != 'undefined') || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
	modelTimestamps.push({ id: 'symptomatic_forcovid', time: timestamps['53']});
    symptomatic_formucormycosis = (typeof answers['55'] != 'undefined') || (typeof answers['59'] != 'undefined') || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
	modelTimestamps.push({ id: 'symptomatic_formucormycosis', time: timestamps['53']});
        symptoms = symptoms1;
		symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
						...symptoms5, ...symptoms6, ...symptoms7);
						modelTimestamps.push({ id: 'symptoms', time: timestamps['53']});

					callback({
						name,
						age,
						gender,
						telephone,
						email,
						Profession,
						hospital,
						type,
						SPO2_value,
						Pulserate,
						BP_value,
						Temperatue_value,
						Bloodglucosevaluetakenat,
						Bloodglucose_value,
						Covid19_when,
						Hospitalization_during_covid,
						steroids_taken,
						oxygen_support_duringcovid,
						HRCT_report,
						CRP_report,
						IL6_report,
						Ddimer_report,
						Ferritinin_report,
						Procalcitonin_report,
						KFT_report,
						symptomatic_forcovid,
						symptomatic_formucormycosis,
						symptoms,
						vaccination_status,
						additional_symptoms,
            timestamps: modelTimestamps,
					});

		}
		else if (answers['47'] == '0'){
		duration_hospitalization = getQuestionById(67).options[answers['67']].dbValue;
		modelTimestamps.push({ id: 'duration_hospitalization', time: timestamps['67']});
		steroids_given_duringstay = getQuestionById(68).options[answers['68']].dbValue;
		modelTimestamps.push({ id: 'steroids_given_duringstay', time: timestamps['68']});
		oxygen_support_duringstay = getQuestionById(69).options[answers['69']].dbValue;
		modelTimestamps.push({ id: 'oxygen_support_duringstay', time: timestamps['69']});
        currenthealth = answers['50'];
		modelTimestamps.push({ id: 'currenthealth', time: timestamps['50']});
		HRCT_report = answers['51'] && answers['51'].includes('0') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'HRCT_report', time: timestamps['51']});
        CRP_report = answers['51'] && answers['51'].includes('1') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'CRP_report', time: timestamps['51']});
        IL6_report = answers['51'] && answers['51'].includes('2') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'IL6_report', time: timestamps['51']});
        Ddimer_report = answers['51'] && answers['51'].includes('3') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ddimer_report', time: timestamps['51']});
        Ferritinin_report = answers['51'] && answers['51'].includes('4') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ferritinin_report', time: timestamps['51']});
        Procalcitonin_report = answers['51'] && answers['51'].includes('5') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Procalcitonin_report', time: timestamps['51']});
		KFT_report = answers['51'] && answers['51'].includes('6') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'KFT_report', time: timestamps['51']});
		symptoms1 = !answers['53'].includes('None of the listed') ? answers['53'] : [];
		symptoms2 = answers['55'] && !answers['55'].includes('None of the listed') ? answers['55'] : [];
		symptoms3 = answers['56'] && !answers['56'].includes('None of the listed') ? answers['56'] : [];
		symptoms4 = answers['57'] && !answers['57'].includes('None of the listed') ? answers['57'] : [];
		symptoms5 = answers['59'] && !answers['59'].includes('None of the listed') ? answers['59'] : [];
		symptoms6 = answers['60'] && !answers['60'].includes('None of the listed')  ? answers['60'] : [];
		symptoms7 = answers['61'] && !answers['61'].includes('None of the listed') ? answers['61'] : [];
        additional_symptoms = answers['63'];
		modelTimestamps.push({ id: 'additional_symptoms', time: timestamps['63']});
		vaccination_status = answers['64'] == '0' ? getQuestionById(65).options[answers['65']].dbValue : 'NA';
		modelTimestamps.push({ id: 'vaccination_status', time: timestamps['64']});

    symptomatic_forcovid = (typeof answers['56'] != 'undefined') || (typeof answers['60'] != 'undefined') || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
	modelTimestamps.push({ id: 'symptomatic_forcovid', time: timestamps['53']});
    symptomatic_formucormycosis = (typeof answers['55'] != 'undefined') || (typeof answers['59'] != 'undefined') || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
	modelTimestamps.push({ id: 'symptomatic_formucormycosis', time: timestamps['53']});
        symptoms = symptoms1;
		symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
						...symptoms5, ...symptoms6, ...symptoms7);
						modelTimestamps.push({ id: 'symptoms', time: timestamps['53']});

					callback({
						name,
						age,
						gender,
						telephone,
						email,
						Profession,
						hospital,
						type,
						SPO2_value,
						Pulserate,
						BP_value,
						Temperatue_value,
						Bloodglucosevaluetakenat,
						Bloodglucose_value,
						Covid19_when,
						Hospitalization_during_covid,
						duration_hospitalization,
						steroids_given_duringstay,
						oxygen_support_duringstay,
						HRCT_report,
						CRP_report,
						IL6_report,
						Ddimer_report,
						Ferritinin_report,
						Procalcitonin_report,
						KFT_report,
						symptomatic_forcovid,
						symptomatic_formucormycosis,
						symptoms,
						vaccination_status,
						additional_symptoms,
            timestamps: modelTimestamps,
					});
		}
    else {
      currenthealth = answers['50'];
	  modelTimestamps.push({ id: 'currenthealth', time: timestamps['50']});
		HRCT_report = answers['51'] && answers['51'].includes('0') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'HRCT_report', time: timestamps['51']});
        CRP_report = answers['51'] && answers['51'].includes('1') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'CRP_report', time: timestamps['51']});
        IL6_report = answers['51'] && answers['51'].includes('2') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'IL6_report', time: timestamps['51']});
        Ddimer_report = answers['51'] && answers['51'].includes('3') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ddimer_report', time: timestamps['51']});
        Ferritinin_report = answers['51'] && answers['51'].includes('4') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Ferritinin_report', time: timestamps['51']});
        Procalcitonin_report = answers['51'] && answers['51'].includes('5') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'Procalcitonin_report', time: timestamps['51']});
		KFT_report = answers['51'] && answers['51'].includes('6') ? 'Yes' : 'NA';
		modelTimestamps.push({ id: 'KFT_report', time: timestamps['51']});
		symptoms1 = !answers['53'].includes('None of the listed') ? answers['53'] : [];
		symptoms2 = answers['55'] && !answers['55'].includes('None of the listed') ? answers['55'] : [];
		symptoms3 = answers['56'] && !answers['56'].includes('None of the listed') ? answers['56'] : [];
		symptoms4 = answers['57'] && !answers['57'].includes('None of the listed') ? answers['57'] : [];
		symptoms5 = answers['59'] && !answers['59'].includes('None of the listed') ? answers['59'] : [];
		symptoms6 = answers['60'] && !answers['60'].includes('None of the listed')  ? answers['60'] : [];
		symptoms7 = answers['61'] && !answers['61'].includes('None of the listed') ? answers['61'] : [];
        additional_symptoms = answers['63'];
		modelTimestamps.push({ id: 'additional_symptoms', time: timestamps['63']});
		vaccination_status = answers['64'] == '0' ? getQuestionById(65).options[answers['65']].dbValue : 'NA';
		modelTimestamps.push({ id: 'vaccination_status', time: timestamps['65']});

    symptomatic_forcovid = (typeof answers['56'] != 'undefined') || (typeof answers['60'] != 'undefined') || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
	modelTimestamps.push({ id: 'symptomatic_forcovid', time: timestamps['53']});
    symptomatic_formucormycosis = (typeof answers['55'] != 'undefined') || (typeof answers['59'] != 'undefined') || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
	modelTimestamps.push({ id: 'symptomatic_formucormycosis', time: timestamps['53']});
        symptoms = symptoms1;
		symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
						...symptoms5, ...symptoms6, ...symptoms7);
						modelTimestamps.push({ id: 'symptoms', time: timestamps['53']});

        callback({
          name,
          age,
          gender,
          telephone,
          email,
          Profession,
          hospital,
          type,
          SPO2_value,
          Pulserate,
          BP_value,
          Temperatue_value,
          Bloodglucosevaluetakenat,
          Bloodglucose_value,
          HRCT_report,
          CRP_report,
          IL6_report,
          Ddimer_report,
          Ferritinin_report,
          Procalcitonin_report,
          KFT_report,
          symptomatic_forcovid,
          symptomatic_formucormycosis,
          symptoms,
          vaccination_status,
          additional_symptoms,
          timestamps: modelTimestamps,
        });

    }
 // console.log(answers)
      }
    });
  }
}

module.exports = {
  getId,
  answersToModel
};
