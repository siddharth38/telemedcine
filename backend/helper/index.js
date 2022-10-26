const {
  questions
} = require("../data/questions");
const Doctor = require("../models/doctor");

function getDbValue(questionIndex, dbQuestionIndex, answers) {
  try {
    if (answers && answers[questionIndex + ""] === "0") {
      if (answers[dbQuestionIndex + ""] !== undefined) {
        return (
          getQuestionById(dbQuestionIndex).options[answers[dbQuestionIndex + ""]].dbValue || ""
        );
      } else return "";
    } else return "";
  } catch (err) {
    return "";
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
    return `${cleansedName.split(" ")[0]}-${number}`.toLowerCase();
  }
  return null;
}

function updateCardiacScore(id, answers){
  cardiac_score = getQuestionById(id).options[answers[id]].cardiac_score;
  if (cardiac_score) return cardiac_score
  else return 0
}

function getSelectedOption(id, answers){
  return getQuestionById(id).options[answers[id]].dbValue;
}

function opdCommonQuestions(answers, modelTimestamps, timestamps) {
  opd_symptoms = answers["2.4"];
  modelTimestamps.push({ id: "opd_symptoms", time: timestamps["2.4"] });
  opd_symptoms_age = answers["2.41"];
  modelTimestamps.push({ id: "opd_symptoms_age", time: timestamps["2.41"] });
  name = answers["2.5"];
  console.log(name);
  modelTimestamps.push({ id: "name", time: timestamps["2.5"] });
  gender = getQuestionById(2.7).options[answers["2.7"]].dbValue;
  modelTimestamps.push({ id: "gender", time: timestamps["2.7"] });
  age = answers["2.6"];
  modelTimestamps.push({ id: "age", time: timestamps["2.6"] });
  email = answers["2.9"] === "0" ? answers["2.91"] : "";
  modelTimestamps.push({ id: "email", time: timestamps["2.9"] });
  telephone = answers["2.8"];
  modelTimestamps.push({ id: "telephone", time: timestamps["2.8"] });
  return { opd_symptoms, opd_symptoms_age, name, gender, age, email, telephone };
}

function cardiac_analysis(answers, qID, modelTimestamps, timestamps, varToString) {
  let cardiac_score = 0;
  let chest_pain = getQuestionById("71.0 Cardiac screening").options[answers[qID]].dbValue;
  modelTimestamps.push({ id: "chest_pain", time: timestamps[qID] });

  // qID = "71.1 Cardiac pain middle of chest pain";
  // console.log("getQuestionById(`qID`)", getQuestionById(qID))
  // console.log("answers['71.1 Cardiac pain middle of chest pain'])", answers[qID])
  // console.log("getQuestionById('71.1 Cardiac pain middle of chest pain').options", getQuestionById(qID).options)
  // console.log("getQuestionById('71.1 Cardiac pain middle of chest pain').options[answers['71.1 Cardiac pain middle of chest pain']] = ", getQuestionById(qID).options[answers[qID]])
  // pain_in_chest_centre = getSelectedOption(qID, answers);
  // modelTimestamps.push({ id: "pain_in_chest_centre", time: timestamps[qID] });
  // cardiac_score += updateCardiacScore(qID, answers);

  qID = "72.0 Cardiac point pain";
  let cardiac_point_chest_pain = getSelectedOption(qID, answers);
  modelTimestamps.push({ id: "cardiac_point_chest_pain", time: timestamps[qID] });
  cardiac_score += updateCardiacScore(qID, answers);

  qID = "74.0 Cardiac left arm pain";
  let cardiac_left_arm_pain = getSelectedOption(qID, answers);
  modelTimestamps.push({ id: "cardiac_left_arm_pain", time: timestamps[qID] });
  cardiac_score += updateCardiacScore(qID, answers);

  qID = "74.1 Cardiac inner side left arm pain";
  let cardiac_left_arm_pain_inside = getSelectedOption(qID, answers);
  modelTimestamps.push({ id: "cardiac_left_arm_pain_inside", time: timestamps[qID] });
  cardiac_score += updateCardiacScore(qID, answers);

  qID = "73.1 Pain on arm movement";
  let cardiac_arm_movement_pain = getSelectedOption(qID, answers);
  modelTimestamps.push({ id: "cardiac_arm_movement_pain", time: timestamps[qID] });
  cardiac_score += updateCardiacScore(qID, answers);

  qID = "73.2 Cardiac pain on squeezing";
  let cardiac_arm_pressure_pain = getSelectedOption(qID, answers);
  modelTimestamps.push({ id: varToString(cardiac_arm_pressure_pain), time: timestamps[qID] });
  cardiac_score += updateCardiacScore(qID, answers);

  qID = "80.0 Cardiac associated symptoms";
  let cardiac_associated_symptoms = answers[qID];
  modelTimestamps.push({ id: varToString({ cardiac_associated_symptoms }), time: timestamps[qID] });
  let cardiac_sweating = "No";
  let cardiac_breathlessness = "No";
  let cardiac_fatigue = "No";
  if (cardiac_associated_symptoms.includes("Sweating")) {
    cardiac_score++;
    cardiac_sweating = "Yes";
  }
  if (cardiac_associated_symptoms.includes("Breathlessness")) {
    cardiac_score++;
    cardiac_breathlessness = "Yes";
  }
  if (cardiac_associated_symptoms.includes("Fatigue")) {
    cardiac_score++;
    cardiac_fatigue = "Yes";
  }

  let angina = cardiac_score >= 1;
  let cardiac_exertion;
  let angina_episodes;
  let unstable_angina = "No"

  if (angina) {
    qID = "85.0 Cardiac impact of exertion and rest";
    cardiac_exertion = getSelectedOption(qID, answers);
    modelTimestamps.push({ id: "cardiac_exertion", time: timestamps[qID] });
    cardiac_score += updateCardiacScore(qID, answers);

    if (cardiac_exertion === "No") {
      qID = "87.0 Unstable angina?"
      angina_episodes = getSelectedOption(qID, answers)
      modelTimestamps.push({ id: "angina_episodes", time: timestamps[qID] });
      cardiac_score += updateCardiacScore(qID, answers)

      if (angina_episodes === "Yes") unstable_angina = "Yes"
    }
  }

  return {
    chest_pain,
    cardiac_point_chest_pain,
    cardiac_score,
    cardiac_left_arm_pain,
    cardiac_left_arm_pain_inside,
    cardiac_arm_movement_pain,
    cardiac_arm_pressure_pain,
    cardiac_sweating,
    cardiac_breathlessness,
    cardiac_fatigue,
    angina,
    cardiac_exertion,
    angina_episodes,
    unstable_angina
  };
}

/*
 * Push user responses into DB and make decisions based on user responses
 */
function answersToModel(answers, timestamps, callback) {
  if (!answers) {
    callback({});
  } else {
    Doctor.find().distinct("hospital", (err, hospitals) => {
      let type;
      console.log("answersToModel()")
      if (err || !hospitals) return callback({});
      let hospital = hospitals[answers["26"]];
      let aiims_id = hospital === "AIIMS Jodhpur" ? answers["27"] : "";

      try {
        type = getQuestionById(28).options[answers["28"]].dbValue;
        console.log("type = ", type)
      } catch (typeError){
        type = undefined
      }

      let modelTimestamps = [];

      if (type === "OPD") {
        console.log("answersToModel - 'OPD'");
        const {
          opd_symptoms,
          opd_symptoms_age,
          name,
          gender,
          age,
          email,
          telephone
        } = opdCommonQuestions(answers, modelTimestamps, timestamps);

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
          "timestamps": modelTimestamps
        });
      } else if (answers["70"] === "0" && (typeof answers["22"] != "undefined")) {
        /*
         * Self assessment for Mucormycosis
         * 22: Would you like to go for consultation
         */
        can_feel_nose_and_cheek = answers["4"] === "0" ? "Yes" : "No";
        modelTimestamps.push({ id: "can_feel_nose_and_cheek", time: timestamps["53"] });
        can_close_eyes = answers["6"] === "0" ? "Yes" : "No";
        modelTimestamps.push({ id: "can_close_eyes", time: timestamps["53"] });
        swelling_upper_pallette = answers["8"] === "0" ? "Yes" : "No";
        modelTimestamps.push({ id: "swelling_upper_pallette", time: timestamps["53"] });
        discoloration_upper_palette = answers["9"] === "0" ? "Yes" : "No";
        modelTimestamps.push({ id: "discoloration_upper_palette", time: timestamps["53"] });
        name = answers["29"];
        modelTimestamps.push({ id: "name", time: timestamps["29"] });
        gender = getQuestionById(32).options[answers["32"]].dbValue;
        modelTimestamps.push({ id: "gender", time: timestamps["32"] });
        age = answers["31"];
        modelTimestamps.push({ id: "age", time: timestamps["31"] });
        email = answers["33"] === "0" ? answers["34"] : "";
        modelTimestamps.push({ id: "email", time: timestamps["33"] });
        Profession = getQuestionById(34.1).options[answers["34.1"]].dbValue;
        modelTimestamps.push({ id: "Profession", time: timestamps["34.1"] });
        telephone = answers["30"];
        modelTimestamps.push({ id: "telephone", time: timestamps["30"] });
        covid19_before = answers["35"];
        modelTimestamps.push({ id: "covid19_before", time: timestamps["35"] });
        BP_value = answers["36"] === "0" ? answers["37"] : "NA";
        modelTimestamps.push({ id: "BP_value", time: timestamps["36"] });
        SPO2_value = answers["38"] === "0" ? answers["39"] : "NA";
        modelTimestamps.push({ id: "SPO2_value", time: timestamps["38"] });
        Pulserate = answers["38"] === "0" ? answers["40"] : "NA";
        modelTimestamps.push({ id: "Pulserate", time: timestamps["38"] });
        Temperature_value = answers["41"] === "0" ? answers["42"] : "NA";
        modelTimestamps.push({ id: "Temperature_value", time: timestamps["41"] });
        Bloodglucose_taken_at = answers["43"] === "0" ? getQuestionById(44).options[answers["44"]].dbValue : "NA";
        modelTimestamps.push({ id: "Bloodglucose_taken_at", time: timestamps["43"] });
        Bloodglucose_value = answers["43"] === "0" ? answers["45"] : "NA";
        modelTimestamps.push({ id: "Bloodglucose_value", time: timestamps["43"] });
        Covid19_when = answers["35"] === "0" ? getQuestionById(46).options[answers["46"]].dbValue : "";
        modelTimestamps.push({ id: "Covid19_when", time: timestamps["35"] });
        Hospitalization_during_covid = answers["35"] === "0" ? getQuestionById(47).options[answers["47"]].dbValue : "";
        modelTimestamps.push({ id: "Hospitalization_during_covid", time: timestamps["35"] });
        // console.log(answers);
        if (answers["47"] === "1") {
          // hospitalized for covid
          // TODO: possibly wrong code, might need value reversal
          steroids_taken = answers["35"] === "0" ? getQuestionById(47).options[answers["47"]].dbValue : "";
          modelTimestamps.push({ id: "steroids_taken", time: timestamps["35"] });
          oxygen_support_duringcovid = getQuestionById(49).options[answers["49"]].dbValue;
          modelTimestamps.push({ id: "oxygen_support_duringcovid", time: timestamps["49"] });
          currenthealth = answers["50"];
          modelTimestamps.push({ id: "currenthealth", time: timestamps["50"] });
          HRCT_report = answers["51"] && answers["51"].includes(0) ? "Available" : "NA";
          modelTimestamps.push({ id: "HRCT_report", time: timestamps["51"] });
          CRP_report = answers["51"] && answers["51"].includes(1) ? "Available" : "NA";
          modelTimestamps.push({ id: "CRP_report", time: timestamps["51"] });
          IL6_report = answers["51"] && answers["51"].includes(2) ? "Available" : "NA";
          modelTimestamps.push({ id: "IL6_report", time: timestamps["51"] });
          Ddimer_report = answers["51"] && answers["51"].includes(3) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ddimer_report", time: timestamps["51"] });
          Ferritinin_report = answers["51"] && answers["51"].includes(4) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ferritinin_report", time: timestamps["51"] });
          Procalcitonin_report = answers["51"] && answers["51"].includes(5) ? "Available" : "NA";
          modelTimestamps.push({ id: "Procalcitonin_report", time: timestamps["51"] });
          KFT_report = answers["51"] && answers["51"].includes(6) ? "Available" : "NA";
          modelTimestamps.push({ id: "KFT_report", time: timestamps["51"] });
          symptoms1 = !answers["53"].includes("None of the listed") ? answers["53"] : [];
          symptoms2 = answers["55"] && !answers["55"].includes("None of the listed") ? answers["55"] : [];
          symptoms3 = answers["56"] && !answers["56"].includes("None of the listed") ? answers["56"] : [];
          symptoms4 = answers["57"] && !answers["57"].includes("None of the listed") ? answers["57"] : [];
          symptoms5 = answers["59"] && !answers["59"].includes("None of the listed") ? answers["59"] : [];
          symptoms6 = answers["60"] && !answers["60"].includes("None of the listed") ? answers["60"] : [];
          symptoms7 = answers["61"] && !answers["61"].includes("None of the listed") ? answers["61"] : [];
          additional_symptoms = answers["63"];
          modelTimestamps.push({ id: "additional_symptoms", time: timestamps["63"] });
          vaccination_status = answers["64"] === "0" ? getQuestionById(65).options[answers["65"]].dbValue : "NA";
          modelTimestamps.push({ id: "vaccination_status", time: timestamps["65"] });

          symptomatic_forcovid = (typeof answers["56"] != "undefined") || (typeof answers["60"] != "undefined") || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
          modelTimestamps.push({ id: "symptomatic_forcovid", time: timestamps["53"] });
          symptomatic_formucormycosis = (typeof answers["55"] != "undefined") || (typeof answers["59"] != "undefined") || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
          modelTimestamps.push({ id: "symptomatic_formucormycosis", time: timestamps["53"] });
          symptoms = symptoms1;
          symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
            ...symptoms5, ...symptoms6, ...symptoms7);
          modelTimestamps.push({ id: "symptoms", time: timestamps["53"] });

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
            Temperature_value,
            Bloodglucose_taken_at,
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
            can_feel_nose_and_cheek,
            can_close_eyes,
            swelling_upper_pallette,
            discoloration_upper_palette,
            symptoms,
            vaccination_status,
            additional_symptoms,
            timestamps: modelTimestamps
          });

        } else if (answers["47"] === "0") {
          // TODO: reverse values. possibly wrong code
          can_feel_nose_and_cheek = answers["4"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "can_feel_nose_and_cheek", time: timestamps["53"] });
          can_close_eyes = answers["6"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "can_close_eyes", time: timestamps["53"] });
          swelling_upper_pallette = answers["8"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "swelling_upper_pallette", time: timestamps["53"] });
          discoloration_upper_palette = answers["9"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "discoloration_upper_palette", time: timestamps["53"] });
          duration_hospitalization = getQuestionById(67).options[answers["67"]].dbValue;
          modelTimestamps.push({ id: "duration_hospitalization", time: timestamps["67"] });
          steroids_given_duringstay = getQuestionById(68).options[answers["68"]].dbValue;
          modelTimestamps.push({ id: "steroids_given_duringstay", time: timestamps["68"] });
          oxygen_support_duringstay = getQuestionById(69).options[answers["69"]].dbValue;
          modelTimestamps.push({ id: "oxygen_support_duringstay", time: timestamps["69"] });
          currenthealth = answers["50"];
          modelTimestamps.push({ id: "currenthealth", time: timestamps["50"] });
          HRCT_report = answers["51"] && answers["51"].includes(0) ? "Available" : "NA";
          modelTimestamps.push({ id: "HRCT_report", time: timestamps["51"] });
          CRP_report = answers["51"] && answers["51"].includes(1) ? "Available" : "NA";
          modelTimestamps.push({ id: "CRP_report", time: timestamps["51"] });
          IL6_report = answers["51"] && answers["51"].includes(2) ? "Available" : "NA";
          modelTimestamps.push({ id: "IL6_report", time: timestamps["51"] });
          Ddimer_report = answers["51"] && answers["51"].includes(3) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ddimer_report", time: timestamps["51"] });
          Ferritinin_report = answers["51"] && answers["51"].includes(4) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ferritinin_report", time: timestamps["51"] });
          Procalcitonin_report = answers["51"] && answers["51"].includes(5) ? "Available" : "NA";
          modelTimestamps.push({ id: "Procalcitonin_report", time: timestamps["51"] });
          KFT_report = answers["51"] && answers["51"].includes(6) ? "Available" : "NA";
          modelTimestamps.push({ id: "KFT_report", time: timestamps["51"] });
          symptoms1 = !answers["53"].includes("None of the listed") ? answers["53"] : [];
          symptoms2 = answers["55"] && !answers["55"].includes("None of the listed") ? answers["55"] : [];
          symptoms3 = answers["56"] && !answers["56"].includes("None of the listed") ? answers["56"] : [];
          symptoms4 = answers["57"] && !answers["57"].includes("None of the listed") ? answers["57"] : [];
          symptoms5 = answers["59"] && !answers["59"].includes("None of the listed") ? answers["59"] : [];
          symptoms6 = answers["60"] && !answers["60"].includes("None of the listed") ? answers["60"] : [];
          symptoms7 = answers["61"] && !answers["61"].includes("None of the listed") ? answers["61"] : [];
          additional_symptoms = answers["63"];
          modelTimestamps.push({ id: "additional_symptoms", time: timestamps["63"] });
          vaccination_status = answers["64"] === "0" ? getQuestionById(65).options[answers["65"]].dbValue : "NA";
          modelTimestamps.push({ id: "vaccination_status", time: timestamps["64"] });

          symptomatic_forcovid = (typeof answers["56"] != "undefined") || (typeof answers["60"] != "undefined") || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
          modelTimestamps.push({ id: "symptomatic_forcovid", time: timestamps["53"] });
          symptomatic_formucormycosis = (typeof answers["55"] != "undefined") || (typeof answers["59"] != "undefined") || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
          modelTimestamps.push({ id: "symptomatic_formucormycosis", time: timestamps["53"] });
          symptoms = symptoms1;
          symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
            ...symptoms5, ...symptoms6, ...symptoms7);
          modelTimestamps.push({ id: "symptoms", time: timestamps["53"] });

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
            Temperature_value,
            Bloodglucose_taken_at,
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
            can_feel_nose_and_cheek,
            can_close_eyes,
            swelling_upper_pallette,
            discoloration_upper_palette,
            symptoms,
            vaccination_status,
            additional_symptoms,
            timestamps: modelTimestamps
          });
        } else {
          // self assessed
          can_feel_nose_and_cheek = answers["4"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "can_feel_nose_and_cheek", time: timestamps["53"] });
          can_close_eyes = answers["6"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "can_close_eyes", time: timestamps["53"] });
          swelling_upper_pallette = answers["8"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "swelling_upper_pallette", time: timestamps["53"] });
          discoloration_upper_palette = answers["9"] === "0" ? "Yes" : "No";
          modelTimestamps.push({ id: "discoloration_upper_palette", time: timestamps["53"] });
          currenthealth = answers["50"];
          modelTimestamps.push({ id: "currenthealth", time: timestamps["50"] });
          HRCT_report = answers["51"] && answers["51"].includes(0) ? "Available" : "NA";
          modelTimestamps.push({ id: "HRCT_report", time: timestamps["51"] });
          CRP_report = answers["51"] && answers["51"].includes(1) ? "Available" : "NA";
          modelTimestamps.push({ id: "CRP_report", time: timestamps["51"] });
          IL6_report = answers["51"] && answers["51"].includes(2) ? "Available" : "NA";
          modelTimestamps.push({ id: "IL6_report", time: timestamps["51"] });
          Ddimer_report = answers["51"] && answers["51"].includes(3) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ddimer_report", time: timestamps["51"] });
          Ferritinin_report = answers["51"] && answers["51"].includes(4) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ferritinin_report", time: timestamps["51"] });
          Procalcitonin_report = answers["51"] && answers["51"].includes(5) ? "Available" : "NA";
          modelTimestamps.push({ id: "Procalcitonin_report", time: timestamps["51"] });
          KFT_report = answers["51"] && answers["51"].includes(6) ? "Available" : "NA";
          modelTimestamps.push({ id: "KFT_report", time: timestamps["51"] });
          symptoms1 = !answers["53"].includes("None of the listed") ? answers["53"] : [];
          symptoms2 = answers["55"] && !answers["55"].includes("None of the listed") ? answers["55"] : [];
          symptoms3 = answers["56"] && !answers["56"].includes("None of the listed") ? answers["56"] : [];
          symptoms4 = answers["57"] && !answers["57"].includes("None of the listed") ? answers["57"] : [];
          symptoms5 = answers["59"] && !answers["59"].includes("None of the listed") ? answers["59"] : [];
          symptoms6 = answers["60"] && !answers["60"].includes("None of the listed") ? answers["60"] : [];
          symptoms7 = answers["61"] && !answers["61"].includes("None of the listed") ? answers["61"] : [];
          additional_symptoms = answers["63"];
          modelTimestamps.push({ id: "additional_symptoms", time: timestamps["63"] });
          vaccination_status = answers["64"] === "0" ? getQuestionById(65).options[answers["65"]].dbValue : "NA";
          modelTimestamps.push({ id: "vaccination_status", time: timestamps["65"] });

          symptomatic_forcovid = (typeof answers["56"] != "undefined") || (typeof answers["60"] != "undefined") || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
          modelTimestamps.push({ id: "symptomatic_forcovid", time: timestamps["53"] });
          symptomatic_formucormycosis = (typeof answers["55"] != "undefined") || (typeof answers["59"] != "undefined") || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
          modelTimestamps.push({ id: "symptomatic_formucormycosis", time: timestamps["53"] });
          symptoms = symptoms1;
          symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
            ...symptoms5, ...symptoms6, ...symptoms7);
          modelTimestamps.push({ id: "symptoms", time: timestamps["53"] });

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
            Temperature_value,
            Bloodglucose_taken_at,
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
            can_feel_nose_and_cheek,
            can_close_eyes,
            swelling_upper_pallette,
            discoloration_upper_palette,
            symptoms,
            vaccination_status,
            additional_symptoms,
            timestamps: modelTimestamps
          });

        }
        // console.log(symptomatic_forcovid, symptomatic_formucormycosis)
      } else if ((answers["1"] === 1) && (typeof answers["81.0 Cardiac assessment"] !== undefined)) {
        // Angina screening
        console.log("cardiac screening");
        const varToString = varObj => Object.keys(varObj)[0];

        const {
          opd_symptoms,
          opd_symptoms_age,
          name,
          gender,
          age,
          email,
          telephone
        } = opdCommonQuestions(answers, modelTimestamps, timestamps);

        const { chest_pain,
          cardiac_point_chest_pain,
          cardiac_score,
          cardiac_left_arm_pain,
          cardiac_left_arm_pain_inside,
          cardiac_arm_movement_pain,
          cardiac_arm_pressure_pain,
          cardiac_sweating,
          cardiac_breathlessness,
          cardiac_fatigue,
          angina,
          cardiac_exertion } = cardiac_analysis(answers, "71.0 Cardiac screening", modelTimestamps, timestamps, varToString);

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
          chest_pain,
          cardiac_point_chest_pain,
          cardiac_arm_pressure_pain,
          cardiac_arm_movement_pain,
          cardiac_left_arm_pain,
          cardiac_left_arm_pain_inside,
          cardiac_breathlessness,
          cardiac_fatigue,
          cardiac_sweating,
          angina,
          cardiac_exertion,
          cardiac_score,
          aiims_id,
          "timestamps": modelTimestamps
        });
      } else {
        console.log("covid mucormycosis questionaire. else");
        // CoViD and Mucormycosis questionaire
        name = answers["29"];
        modelTimestamps.push({ id: "name", time: timestamps["29"] });
        gender = getQuestionById(32).options[answers["32"]].dbValue;
        modelTimestamps.push({ id: "gender", time: timestamps["32"] });
        age = answers["31"];
        modelTimestamps.push({ id: "age", time: timestamps["31"] });
        email = answers["33"] === "0" ? answers["34"] : "";
        modelTimestamps.push({ id: "email", time: timestamps["33"] });
        Profession = getQuestionById(34.1).options[answers["34.1"]].dbValue;
        modelTimestamps.push({ id: "Profession", time: timestamps["34.1"] });
        telephone = answers["30"];
        modelTimestamps.push({ id: "telephone", time: timestamps["30"] });
        covid19_before = answers["35"];
        modelTimestamps.push({ id: "covid19_before", time: timestamps["35"] });
        BP_value = answers["36"] === "0" ? answers["37"] : "NA";
        modelTimestamps.push({ id: "BP_value", time: timestamps["36"] });
        SPO2_value = answers["38"] === "0" ? answers["39"] : "NA";
        modelTimestamps.push({ id: "SPO2_value", time: timestamps["38"] });
        Pulserate = answers["38"] === "0" ? answers["40"] : "NA";
        modelTimestamps.push({ id: "Pulserate", time: timestamps["38"] });
        Temperature_value = answers["41"] === "0" ? answers["42"] : "NA";
        modelTimestamps.push({ id: "Temperature_value", time: timestamps["41"] });
        Bloodglucose_taken_at = answers["43"] === "0" ? getQuestionById(44).options[answers["44"]].dbValue : "NA";
        modelTimestamps.push({ id: "Bloodglucose_taken_at", time: timestamps["43"] });
        Bloodglucose_value = answers["43"] === "0" ? answers["45"] : "NA";
        modelTimestamps.push({ id: "Bloodglucose_value", time: timestamps["43"] });
        Covid19_when = answers["35"] === "0" ? getQuestionById(46).options[answers["46"]].dbValue : "";
        modelTimestamps.push({ id: "Covid19_when", time: timestamps["35"] });
        Hospitalization_during_covid = answers["35"] === "0" ? getQuestionById(47).options[answers["47"]].dbValue : "";
        modelTimestamps.push({ id: "Hospitalization_during_covid", time: timestamps["35"] });
        // console.log(answers);
        if (answers["47"] === "1") {
          steroids_taken = answers["35"] === "0" ? getQuestionById(47).options[answers["47"]].dbValue : "";
          modelTimestamps.push({ id: "steroids_taken", time: timestamps["35"] });
          oxygen_support_duringcovid = getQuestionById(49).options[answers["49"]].dbValue;
          modelTimestamps.push({ id: "oxygen_support_duringcovid", time: timestamps["49"] });
          currenthealth = answers["50"];
          modelTimestamps.push({ id: "currenthealth", time: timestamps["50"] });
          HRCT_report = answers["51"] && answers["51"].includes(0) ? "Available" : "NA";
          modelTimestamps.push({ id: "HRCT_report", time: timestamps["51"] });
          CRP_report = answers["51"] && answers["51"].includes(1) ? "Available" : "NA";
          modelTimestamps.push({ id: "CRP_report", time: timestamps["51"] });
          IL6_report = answers["51"] && answers["51"].includes(2) ? "Available" : "NA";
          modelTimestamps.push({ id: "IL6_report", time: timestamps["51"] });
          Ddimer_report = answers["51"] && answers["51"].includes(3) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ddimer_report", time: timestamps["51"] });
          Ferritinin_report = answers["51"] && answers["51"].includes(4) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ferritinin_report", time: timestamps["51"] });
          Procalcitonin_report = answers["51"] && answers["51"].includes(5) ? "Available" : "NA";
          modelTimestamps.push({ id: "Procalcitonin_report", time: timestamps["51"] });
          KFT_report = answers["51"] && answers["51"].includes(6) ? "Available" : "NA";
          modelTimestamps.push({ id: "KFT_report", time: timestamps["51"] });
          symptoms1 = !answers["53"].includes("None of the listed") ? answers["53"] : [];
          symptoms2 = answers["55"] && !answers["55"].includes("None of the listed") ? answers["55"] : [];
          symptoms3 = answers["56"] && !answers["56"].includes("None of the listed") ? answers["56"] : [];
          symptoms4 = answers["57"] && !answers["57"].includes("None of the listed") ? answers["57"] : [];
          symptoms5 = answers["59"] && !answers["59"].includes("None of the listed") ? answers["59"] : [];
          symptoms6 = answers["60"] && !answers["60"].includes("None of the listed") ? answers["60"] : [];
          symptoms7 = answers["61"] && !answers["61"].includes("None of the listed") ? answers["61"] : [];
          additional_symptoms = answers["63"];
          modelTimestamps.push({ id: "additional_symptoms", time: timestamps["63"] });
          vaccination_status = answers["64"] === "0" ? getQuestionById(65).options[answers["65"]].dbValue : "NA";
          modelTimestamps.push({ id: "vaccination_status", time: timestamps["65"] });

          symptomatic_forcovid = (typeof answers["56"] != "undefined") || (typeof answers["60"] != "undefined") || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
          modelTimestamps.push({ id: "symptomatic_forcovid", time: timestamps["53"] });
          symptomatic_formucormycosis = (typeof answers["55"] != "undefined") || (typeof answers["59"] != "undefined") || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
          modelTimestamps.push({ id: "symptomatic_formucormycosis", time: timestamps["53"] });
          symptoms = symptoms1;
          symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
            ...symptoms5, ...symptoms6, ...symptoms7);
          modelTimestamps.push({ id: "symptoms", time: timestamps["53"] });

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
            Temperature_value,
            Bloodglucose_taken_at,
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
            timestamps: modelTimestamps
          });

        } else if (answers["47"] === "0") {
          duration_hospitalization = getQuestionById(67).options[answers["67"]].dbValue;
          modelTimestamps.push({ id: "duration_hospitalization", time: timestamps["67"] });
          steroids_given_duringstay = getQuestionById(68).options[answers["68"]].dbValue;
          modelTimestamps.push({ id: "steroids_given_duringstay", time: timestamps["68"] });
          oxygen_support_duringstay = getQuestionById(69).options[answers["69"]].dbValue;
          modelTimestamps.push({ id: "oxygen_support_duringstay", time: timestamps["69"] });
          currenthealth = answers["50"];
          modelTimestamps.push({ id: "currenthealth", time: timestamps["50"] });
          HRCT_report = answers["51"] && answers["51"].includes(0) ? "Available" : "NA";
          modelTimestamps.push({ id: "HRCT_report", time: timestamps["51"] });
          CRP_report = answers["51"] && answers["51"].includes(1) ? "Available" : "NA";
          modelTimestamps.push({ id: "CRP_report", time: timestamps["51"] });
          IL6_report = answers["51"] && answers["51"].includes(2) ? "Available" : "NA";
          modelTimestamps.push({ id: "IL6_report", time: timestamps["51"] });
          Ddimer_report = answers["51"] && answers["51"].includes(3) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ddimer_report", time: timestamps["51"] });
          Ferritinin_report = answers["51"] && answers["51"].includes(4) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ferritinin_report", time: timestamps["51"] });
          Procalcitonin_report = answers["51"] && answers["51"].includes(5) ? "Available" : "NA";
          modelTimestamps.push({ id: "Procalcitonin_report", time: timestamps["51"] });
          KFT_report = answers["51"] && answers["51"].includes(6) ? "Available" : "NA";
          modelTimestamps.push({ id: "KFT_report", time: timestamps["51"] });
          symptoms1 = !answers["53"].includes("None of the listed") ? answers["53"] : [];
          symptoms2 = answers["55"] && !answers["55"].includes("None of the listed") ? answers["55"] : [];
          symptoms3 = answers["56"] && !answers["56"].includes("None of the listed") ? answers["56"] : [];
          symptoms4 = answers["57"] && !answers["57"].includes("None of the listed") ? answers["57"] : [];
          symptoms5 = answers["59"] && !answers["59"].includes("None of the listed") ? answers["59"] : [];
          symptoms6 = answers["60"] && !answers["60"].includes("None of the listed") ? answers["60"] : [];
          symptoms7 = answers["61"] && !answers["61"].includes("None of the listed") ? answers["61"] : [];
          additional_symptoms = answers["63"];
          modelTimestamps.push({ id: "additional_symptoms", time: timestamps["63"] });
          vaccination_status = answers["64"] === "0" ? getQuestionById(65).options[answers["65"]].dbValue : "NA";
          modelTimestamps.push({ id: "vaccination_status", time: timestamps["64"] });

          // diagnosis
          symptomatic_forcovid = (typeof answers["56"] != "undefined") || (typeof answers["60"] != "undefined") || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
          modelTimestamps.push({ id: "symptomatic_forcovid", time: timestamps["53"] });
          symptomatic_formucormycosis = (typeof answers["55"] != "undefined") || (typeof answers["59"] != "undefined") || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
          modelTimestamps.push({ id: "symptomatic_formucormycosis", time: timestamps["53"] });
          symptoms = symptoms1;
          symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
            ...symptoms5, ...symptoms6, ...symptoms7);
          modelTimestamps.push({ id: "symptoms", time: timestamps["53"] });

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
            Temperature_value,
            Bloodglucose_taken_at,
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
            timestamps: modelTimestamps
          });
        } else {
          currenthealth = answers["50"];
          modelTimestamps.push({ id: "currenthealth", time: timestamps["50"] });
          HRCT_report = answers["51"] && answers["51"].includes(0) ? "Available" : "NA";
          modelTimestamps.push({ id: "HRCT_report", time: timestamps["51"] });
          CRP_report = answers["51"] && answers["51"].includes(1) ? "Available" : "NA";
          modelTimestamps.push({ id: "CRP_report", time: timestamps["51"] });
          IL6_report = answers["51"] && answers["51"].includes(2) ? "Available" : "NA";
          modelTimestamps.push({ id: "IL6_report", time: timestamps["51"] });
          Ddimer_report = answers["51"] && answers["51"].includes(3) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ddimer_report", time: timestamps["51"] });
          Ferritinin_report = answers["51"] && answers["51"].includes(4) ? "Available" : "NA";
          modelTimestamps.push({ id: "Ferritinin_report", time: timestamps["51"] });
          Procalcitonin_report = answers["51"] && answers["51"].includes(5) ? "Available" : "NA";
          modelTimestamps.push({ id: "Procalcitonin_report", time: timestamps["51"] });
          KFT_report = answers["51"] && answers["51"].includes(6) ? "Available" : "NA";
          modelTimestamps.push({ id: "KFT_report", time: timestamps["51"] });
          symptoms1 = !answers["53"].includes("None of the listed") ? answers["53"] : [];
          symptoms2 = answers["55"] && !answers["55"].includes("None of the listed") ? answers["55"] : [];
          symptoms3 = answers["56"] && !answers["56"].includes("None of the listed") ? answers["56"] : [];
          symptoms4 = answers["57"] && !answers["57"].includes("None of the listed") ? answers["57"] : [];
          symptoms5 = answers["59"] && !answers["59"].includes("None of the listed") ? answers["59"] : [];
          symptoms6 = answers["60"] && !answers["60"].includes("None of the listed") ? answers["60"] : [];
          symptoms7 = answers["61"] && !answers["61"].includes("None of the listed") ? answers["61"] : [];
          additional_symptoms = answers["63"];
          modelTimestamps.push({ id: "additional_symptoms", time: timestamps["63"] });
          vaccination_status = answers["64"] === "0" ? getQuestionById(65).options[answers["65"]].dbValue : "NA";
          modelTimestamps.push({ id: "vaccination_status", time: timestamps["65"] });

          symptomatic_forcovid = (typeof answers["56"] != "undefined") || (typeof answers["60"] != "undefined") || (symptoms7.includes("Loss of smell")) || (symptoms7.includes("Loss of taste")) || false;
          modelTimestamps.push({ id: "symptomatic_forcovid", time: timestamps["53"] });
          symptomatic_formucormycosis = (typeof answers["55"] != "undefined") || (typeof answers["59"] != "undefined") || (symptoms7.includes("Numbness of face")) || (symptoms7.includes("Bulging of the eye")) || (symptoms7.includes("Restricted movement of the eye")) || false;
          modelTimestamps.push({ id: "symptomatic_formucormycosis", time: timestamps["53"] });
          symptoms = symptoms1;
          symptoms.push(...symptoms2, ...symptoms3, ...symptoms4,
            ...symptoms5, ...symptoms6, ...symptoms7);
          modelTimestamps.push({ id: "symptoms", time: timestamps["53"] });

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
            Temperature_value,
            Bloodglucose_taken_at,
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
            timestamps: modelTimestamps
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
