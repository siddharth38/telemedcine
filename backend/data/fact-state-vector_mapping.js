const patient = require('../models/patient')
const { val } = require("mongoose/lib/helpers/populate/SkipPopulateValue");

function generalCategoryToInt(value){
  if (value  === undefined) return 0
  if (value  === 0) return 1
  if (value === false) return 1
  if (value === 1) return 2
  if (value === true) return 2
}

function stateVectorMap(){
  let patient_numeric = [
    [0, 'conversation_session_count'],
    [1, 'SPO2_value'],
    [2, 'Pulserate'],
    [3, 'BP_value'],
    [4, 'Temperature_value'],
    [5, 'Bloodglucose_taken_at'],
    [6, 'Bloodglucose_value'],
    [7, 'cardiac_score'],
  ]
  let patient_dates = [
    // to deal with dates and time
    [0, 'Covid19_when'],
    [1, 'age'],
    [2, 'created_at'],
    [3, 'last_messaged_at'],
    [4, 'last_notified_at'],
    [5, 'opd_symptoms_age'],
  ]
  let patient_categorical = [
    [0, 'HRCT_report', generalCategoryToInt],
    [1, 'CRP_report', generalCategoryToInt],
    [2, 'IL6_report', generalCategoryToInt],
    [3, 'D_dimer_report', generalCategoryToInt],
    [4, 'Ferritinin_report', generalCategoryToInt],
    [5, 'Procalcitonin_report', generalCategoryToInt],
    [6, 'KFT_report', generalCategoryToInt],
    [7, 'Hospitalization_during_covid', generalCategoryToInt],
    [8, 'steroids_given_duringstay', generalCategoryToInt],
    [9, 'oxygen_support_duringstay', generalCategoryToInt],
    [10, 'steroids_taken', generalCategoryToInt],
    [11, 'discoloration_upper_palette', generalCategoryToInt],
    [12, 'swelling_upper_pallette', generalCategoryToInt],
    [13, 'can_close_eyes', generalCategoryToInt],
    [14, 'can_feel_nose_and_cheek', generalCategoryToInt],
    [15, 'vaccination_status', generalCategoryToInt],
    [16, 'symptomatic_forcovid', generalCategoryToInt],

    [17, 'chest_pain', generalCategoryToInt],
    [18, 'cardiac_point_chest_pain', generalCategoryToInt],
    [19, 'cardiac_score', generalCategoryToInt],
    [20, 'cardiac_left_arm_pain', generalCategoryToInt],
    [21, 'cardiac_left_arm_pain_inside', generalCategoryToInt],
    [22, 'cardiac_arm_movement_pain', generalCategoryToInt],
    [23, 'cardiac_arm_pressure_pain', generalCategoryToInt],
    [24, 'cardiac_sweating', generalCategoryToInt],
    [25, 'cardiac_breathlessness', generalCategoryToInt],
    [26, 'cardiac_fatigue', generalCategoryToInt],
    [27, 'angina', generalCategoryToInt],
    [28, 'cardiac_exertion', generalCategoryToInt],
    [29, 'angina_episodes', generalCategoryToInt],
    [30, 'unstable_angina', generalCategoryToInt],

    [31, 'symptomatic_formucormycosis', generalCategoryToInt],
    [32, 'additional_symptoms', generalCategoryToInt],
    [33, 'gender', generalCategoryToInt],
    [34, 'Profession', generalCategoryToInt],
    [35, 'doctor', generalCategoryToInt],
    [36, 'hospital', generalCategoryToInt],
    [37, 'type', generalCategoryToInt],
    [38, 'opd_symptoms', generalCategoryToInt],
    [39, 'patient/disease/visual_impairment', generalCategoryToInt],
    [40, 'patient/disease/vision/right_eye', generalCategoryToInt],
    [41, 'patient/disease/vision/left_eye', generalCategoryToInt],
  ]
  let patient_string = [
    // avoid
  ]
  let patient_history = [
    // later
  ]
  let patient_mappings = [
    [0, '_id'],
    [1, 'conversation_sessions'],   // array
    [2, 'SPO2_value'],
    [3, 'Pulserate'],
    [4, 'BP_value'],
    [5, 'Temperature_value'],
    [6, 'Bloodglucose_taken_at'],
    [7, 'Bloodglucose_value'],
    [8, 'HRCT_report'],
    [9, 'CRP_report'],
    [10, 'IL6_report'],
    [11, 'D_dimer_report'],
    [12, 'Ferritinin_report'],
    [13, 'Procalcitonin_report'],
    [14, 'KFT_report'],
    [15, 'Covid19_when'],
    [16, 'Hospitalization_during_covid'],
    [17, 'duration_hospitalization'],
    [18, 'steroids_given_duringstay'],
    [19, 'oxygen_support_duringstay'],
    [20, 'steroids_taken'],
    [21, 'discoloration_upper_palette'],
    [22, 'swelling_upper_pallette'],
    [23, 'can_close_eyes'],
    [24, 'can_feel_nose_and_cheek'],
    //{ 25,  symptoms},              // array                        // would parse earlier
    [26, 'vaccination_status'],
    [27, 'symptomatic_forcovid'],
    [28, 'chest_pain'],
    [29, 'cardiac_point_chest_pain'],
    [30, 'cardiac_score'],
    [31, 'cardiac_left_arm_pain'],
    [32, 'cardiac_left_arm_pain_inside'],
    [33, 'cardiac_arm_movement_pain'],
    [34, 'cardiac_arm_pressure_pain'],
    [35, 'cardiac_sweating'],
    [36, 'cardiac_breathlessness'],
    [37, 'cardiac_fatigue'],
    [38, 'angina'],
    [39, 'cardiac_exertion'],
    [40, 'angina_episodes'],
    [41, 'unstable_angina'],
    [42, 'symptomatic_formucormycosis'],
    [43, 'additional_symptoms'],
    [44, 'name'],
    [45, 'email'],
    [46, 'telephone'],
    [47, 'gender'],
    [48, 'age'],
    [49, 'Profession'],
    [50, 'latitude'],
    [51, 'longitude'],
    [52, 'ip'],
    [53, 'created_at'],
    [54, 'last_messaged_at'],
    [55, 'last_notified_at'],
    [56, 'chat_id'],
    [57, 'doctor'],
    [58, 'hospital'],
    [59, 'aiims_id'],
    [60, 'type'],
    [61, 'opd_symptoms'],
    [62, 'opd_symptoms_age'],
    // {'timestamps' : 63},    // list                 // won't use
    // {'chat' : 64}            // list                // won't use
    [65, 'patient/disease/visual_impairment'],
    [66, 'patient/disease/vision/right_eye'],
    [67, 'patient/disease/vision/left_eye'],
    [68, 'patient/ABHA_no'],
    [68, 'patient/ABHA_no'],
  ]
  for (let i=0; i < patient_mappings.length; i++){
    // console.log('patient_mappings[i] = ', patient[i])
  }
  // for (let i=0; )
  let conversation_mappings = [
    [0, "tone"],
    [1, "agreement"],
    [2, "open_ended_question"],
    [3, "affirmation"],
    [4, "reflective response"],
    [5, "summarization"],
    [6, "feedback"],
    [7, "responsibility"],
    [8, "advise"],
    [9, "menu for change"],
    [10, "empathy"],
    [11, "enhancing Self-efficacy"],
    [12, "express empathy"],
    [13, "develop Discrepancy"],
    [14, "avoid arguing"],
    [15, "roll with resistance"],
    [16, "support self efficacy"],
    [17, "topic"],
    [18, "topic_interest"],
    [19, "topic_interest"],
    //[20, "past topics"],
    //[21, "pending topics"],
    [22, "advice_state"],
    [23, "reminder_state"],
    [24, "negotiation_state"]
  ]
  let therapy_mappings = [
    [0, "needed"],
    [1, "prescribed"],
    [2, "regular"],
    [3, "irregular"],
  ]
  return { patient_mappings, patient_categorical, patient_numeric }
}

module.exports = { stateVectorMap }