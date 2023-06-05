const Patient = require("../models/patient");
const { stateToNodeMapping } = require("../data/state-action-mapping");

function getPatient(session, patient_id){
  let patient = null
  if (patient_id===null) patient = session.temp_patient
  else patient = Patient.findOne({id:patient_id})
  return patient
}

function makeMask(session, patient_id){
  const patient = getPatient(session, patient_id)
  let nextQuestionActionSpace = []
  for (let i = 0; i<stateToNodeMapping.length; i++){
    if(patient[stateToNodeMapping[i][0]]) nextQuestionActionSpace+=stateToNodeMapping[i][1]
  }
  return { nextQuestionActionSpace }
}

function selectNewFlow(answers, question, session, patient_id){
  let nextFlowIds = makeMask(session, patient_id)
  return nextFlowIds[Math.floor(Math.random() * nextFlowIds.length)]
}

function getQuestionById(id, questions) {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id === id) {
      return questions[i];
    }
  }
  console.error("tried to search for question with ID = ", id)
  return null;
}

function getCurrentSelectedOption(currentQuestion, answers){
  return currentQuestion.options[answers[currentQuestion.id]]
}

module.exports = { getPatient, makeMask, selectNewFlow, getQuestionById, getCurrentSelectedOption }