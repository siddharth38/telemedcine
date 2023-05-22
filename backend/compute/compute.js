let log = require('npmlog')
const { questions, CONTENT_VARIANT_NAME, CONTENT_VARIANTS, STATEMENT, NEXT_QUESTION_LIST, NEXT_QUESTION_VARIANTS, USUAL_ASK, NEXT_QUESTION, DEFAULT_ASK, VARIANT_PROBABILITY, OPTIONS,
  OPTION_STATEMENT_VARIANTS, OPTION_VARIANT_NAME
} = require("../data/questions");
const { TYPE_ANALYSE, TYPE_NONE, TYPE_BUTTON } = require("../helper/values");
const { commands } = require("../data/commands");
const Patient = require('../models/patient');
const Session = require('../models/session');
const { stateVectorMap } = require("../data/fact-state-vector_mapping");
const { value } = require("mongoose/lib/options/propertyOptions");
const { forEach } = require("mongoose/lib/statemachine");

function selectContentVariant(question){
  if (question && question[CONTENT_VARIANTS] !== undefined) {
    let index = Math.floor(Math.random() * question[CONTENT_VARIANTS].length)
    console.log("question[CONTENT_VARIANTS].length = ", question[CONTENT_VARIANTS].length)
    console.log("index = ",  index)
    console.log("question[CONTENT_VARIANTS][index] = ",  question[CONTENT_VARIANTS][index])
    question[STATEMENT] = question[CONTENT_VARIANTS][index][STATEMENT]
    question[CONTENT_VARIANT_NAME] = question[CONTENT_VARIANTS][index][CONTENT_VARIANT_NAME]
  }
  return question
}

function getQuestionById(questions, id){
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id === id) return questions[i];
  }
  console.error("LOG getQuestionById(). failed to search for question with ID = ", id)
  return null;
}

function prepareResult(res, question) {
  console.log('prepareResult(). questionID = ', question.id)
  res.json({
    "none": "none",
    question: question,
    incomingChats: [{ statement: { none: "none" }, type: "incoming" }]
  })
  return res
}

function selectNextQuestionFromList(question){
  // console.log("select next question from list")
  if (question[NEXT_QUESTION_LIST] === undefined) {
    console.log("selectNextQuestionFromList: no next question list exists. deciding the simple way")
    return;
  }

  // TODO : decide based on state (in command?). use probabilities

  let defaultAsk = undefined
  for (let i=0; i<question[NEXT_QUESTION_LIST].length; i++) {
    if (question[NEXT_QUESTION_LIST][i][DEFAULT_ASK] === true) defaultAsk = i
    else if (question[NEXT_QUESTION_LIST][i][VARIANT_PROBABILITY] !== undefined
      && Math.random() < question[NEXT_QUESTION_LIST][i][VARIANT_PROBABILITY]) {
      question[NEXT_QUESTION] = question[NEXT_QUESTION_LIST][i][NEXT_QUESTION]
      return
    }
    console.log('selecting nextQuestion variant. index : ', i)
  }
  // else select default
  if (defaultAsk) {
    console.log('default ask for nextQuestion variant')
    question[NEXT_QUESTION] = question[NEXT_QUESTION_LIST][defaultAsk][NEXT_QUESTION]
    return
  }
  // else select random
  console.log('selecting nextQuestion variant randomly')
  let index = Math.floor(Math.random() * question[NEXT_QUESTION_LIST].length)
  question[NEXT_QUESTION] = question[NEXT_QUESTION_LIST][index][NEXT_QUESTION]
}

function selectOptionStatementVariant(question) {
  for (let optionIndex = 0; optionIndex<question[OPTIONS].length; optionIndex++) {
    if (question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS] !== undefined) {
      let index = Math.floor(Math.random() * question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS].length)
      console.log("question[CONTENT_VARIANTS].length = ", question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS].length)
      console.log("index = ", index)
      console.log("question[CONTENT_VARIANTS][index] = ", question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS][index])
      question[OPTIONS][optionIndex][STATEMENT] = question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS][index][STATEMENT]
      question[OPTIONS][optionIndex][OPTION_VARIANT_NAME] = question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS][index][CONTENT_VARIANT_NAME]
    }
  }
  return question
}

function selectOptionNextQuestion(question) {
  console.log("select next question from options")
  for (let optionIndex = 0; optionIndex<question[OPTIONS].length; optionIndex++) {
    // for every option
    if (question[OPTIONS][optionIndex][NEXT_QUESTION_LIST] === undefined) {
      console.log("selectOptionNextQuestion: no nextQuestion list exists. deciding the simple way")
      continue;                                                                 // move to next option
    }

    // TODO : decide based on state (in command?). use probabilities

    let defaultAsk = undefined
    for (let i = 0; i < question[OPTIONS][optionIndex][NEXT_QUESTION_LIST].length; i++) {
      if (question[OPTIONS][optionIndex][NEXT_QUESTION_LIST][i][DEFAULT_ASK] === true) defaultAsk = i
      else if (question[OPTIONS][optionIndex][NEXT_QUESTION_LIST][i][VARIANT_PROBABILITY] !== undefined
        && Math.random() < question[OPTIONS][optionIndex][NEXT_QUESTION_LIST][i][VARIANT_PROBABILITY]) {
        // non-default. coin flip and select
        question[OPTIONS][optionIndex][NEXT_QUESTION] = question[OPTIONS][optionIndex][NEXT_QUESTION_LIST][i][NEXT_QUESTION]
        break                                                                   // select variant
      }
      console.log('selected nextQuestion variant. index : ', i)
    }
    // else select default
    if (defaultAsk) {
      console.log('default ask for nextQuestion variant')
      question[OPTIONS][optionIndex][NEXT_QUESTION] = question[OPTIONS][optionIndex][NEXT_QUESTION_LIST][defaultAsk][NEXT_QUESTION]
      continue                                                                  // select default variant and move to next option
    }
    // else select random if there's no default
    console.log('selecting nextQuestion variant randomly')
    let index = Math.floor(Math.random() * question[OPTIONS][optionIndex][NEXT_QUESTION_LIST].length)
    question[OPTIONS][optionIndex][NEXT_QUESTION] = question[OPTIONS][optionIndex][NEXT_QUESTION_LIST][index][NEXT_QUESTION]
  }
}

function fetchState(){
  // TODO
}

function analyzeStatement(){
  // TODO
}

function updatePatientWithFacts(session, patient_id, update){
  if (session.patient_id === undefined || session.patient_id === null) {
    console.log('compute.setFacts.updatePatientWithFacts pushing into temp_patient')
    session.temp_patient.push(update);
  } else {
    Patient.findById(patient_id, (err, patient) => {
      if(err === undefined) {
        console.error("compute.setFacts.updatePatientWithFacts session exists, patient not found");
        patient = session.temp_patient
      }
      console.log('compute.setFacts.updatePatientWithFacts patient = ', patient)
      patient.update(update);
      patient.save();
    })
  }
}

function setFacts(session, currentQuestion, answers, patient_id=undefined){
    // console.log('setFacts(). currentQuestion.id = ', currentQuestion.id, '. answers.id = ', answers.id,
    //   '. answers[currentQuestion.id] = ', answers[currentQuestion.id])

    if (currentQuestion.options) {  // button
      // console.log('LOG setFacts(). currentQuestion.options = ', currentQuestion.options)
      // console.log('LOG setFacts(). currentQuestion.options.selectedOption = ',
      //   currentQuestion.options[answers[currentQuestion.id]])
      let fact = currentQuestion.options[answers[currentQuestion.id]].fact
      // console.log('LOG setFacts(). fact = ', fact)
      let db_value = currentQuestion.options[answers[currentQuestion.id]].dbValue
      let value = currentQuestion.options[answers[currentQuestion.id]].value
      console.log('compute.setFacts db_value = ', db_value, '. db_value = ', value)
      if (db_value !== undefined) updatePatientWithFacts(session, patient_id,
        {[db_value]: value})
      if (fact === undefined) return
      if (typeof fact === "string"){
        let update = {[fact]: currentQuestion.options[answers[currentQuestion.id]].value}
        updatePatientWithFacts(session, patient_id, update)
      }
      else {
        if (fact.category === "patient") {
          console.log(`LOG setFacts(). fact.category=${fact.category}, fact.type=${fact.type}, fact.group=${fact.group}, fact.state=${fact.state}, fact.value=${fact.value}`)
          let update = {[fact.category]: [{[fact.type]: [{[fact.group]: [{[fact.state]: [fact.value]}]}]}]}
          console.log('setFacts() ', currentQuestion.id, '. update = ', update)
          updatePatientWithFacts(session, patient_id, update)
        } else if (fact.category === "environment") {} else if (fact.category === "conversation") {}
      }
      // let fact_path = currentQuestion.options[answers[currentQuestion.id]].fact_path
      // console.log(`LOG setFacts(). fact : ${fact_path} = ${fact}`)
      // if (fact!==undefined && fact_path!==undefined){
        // Patient.findById()
        // fact_path = fact_path.split('/')
        // console.log(fact_path)
        // for (let segment in fact_path) {
        //   console.log(segment)
        //   if (segment === 'patient'){
        //     if
        //   }

        // }
        // Session.temp_patient.push({})
    }
}

function runCommand(question, currentQuestion, nextQuestion, command, answers){
  console.log('runCommand()')
  if (currentQuestion && currentQuestion.type === TYPE_NONE && command) {
    // run a task/command
    // console.debug('statement followed by command')
    // console.log('command = ', command, '. commands[command] = ', commands[command])
    nextQuestion = commands[command](answers, currentQuestion);
    // console.debug('nextQuestion = ', nextQuestion)
  }
  else if (currentQuestion && currentQuestion.type === TYPE_ANALYSE && command) {
    // run a task/command
    // console.log('command = ', command)
    // console.log('commands = ', commands)
    // console.log('commands[command] = ', commands[command])
    // console.log('commands[command].type = ', commands[command].type)
    nextQuestion = commands[command](answers, currentQuestion, questions);
    // console.debug('analysis command')
    // console.debug(nextQuestion)
  }
  // else if (type === TYPE_NONE && nextQuestion) {
  // simple statement
  // Without delay, the present question may not get rendered
  // console.log("simple statement. nextQuestion = ", nextQuestion)
  // if (this.questions!==undefined) ;
  // else {
  // 	//default;
  // }
  // }
  return nextQuestion
}


function prepareMessageContentAndOptions(question, currentQuestion, nextQuestion){
  question = selectContentVariant(getQuestionById(questions, nextQuestion))
  if (question && question.type === TYPE_BUTTON) {
    selectOptionStatementVariant(question)
    selectOptionNextQuestion(question)
  }
  return question
}

function actionMessage(question, currentQuestion, nextQuestion) {
  // action
  question = prepareMessageContentAndOptions(question, currentQuestion, nextQuestion);
  if (question[NEXT_QUESTION] === undefined && question[NEXT_QUESTION_LIST] !== undefined) selectNextQuestionFromList(question);
  return question;
}

// convert path to json
function sanitizeFact(fact){
  fact = fact.replace('""', 'null')
  fact = '"' + fact
  fact = fact.replace('/', '":"')
  fact = fact+'"'
  fact.replace('""', '"')
  fact.replace(`"'`, '"')
  fact.replace(`'"`, '"')
  fact = fact.replace('null', '""')
  fact = `{${fact}}`
  return fact
}

function createStateVectorForPatient(patient){
  const { patient_mappings, patient_categorical, patient_numeric } = stateVectorMap()
  console.log('compute.createStateVectorForPatient : patient = ', patient)
  if (patient === undefined){
    let apc = Array(patient_categorical).fill(0);
    let apm = Array(patient_mappings.length).fill(0);
    let apn = Array(patient_numeric.length).fill(0);
    return {apc, apm, apn}
  }

  // patient.forEach((fact)=> {
  //   console.log('compute.createStateVectorForPatient.patient.forEach : keys = ', Object.keys(fact));
  // })

  let statePatientCategorical = []
  for (let i =0; i<patient_categorical.length; i++){
    let index = patient_categorical[i][0]
    let fact = patient_categorical[i][1]
    let func = patient_categorical[i][2]
    // console.log('compute.createStateVectorForPatient : type(fact) = ', typeof fact, '. fact = ', fact)
    if (fact.includes('/')) {
      // nested fact
      fact = sanitizeFact(fact)
      // console.log('createStateVector. patient[fact] = ', fact)
      statePatientCategorical[index] = patient[fact]
    }
    else {
      patient.forEach((patient_fact) => {
        if (Object.keys(patient_fact) && Object.keys(patient_fact).includes(fact)){
          // console.log('compute.createStateVectorForPatient.loop.patient.forEach found fact = ', fact)
          if (func!==undefined) statePatientCategorical[index] = func(patient_fact)
          else statePatientCategorical[index] = patient_fact
        }
      })
    }
    // console.log("createStateVector end stateVector = ", stateVector)
  }
  // console.log("createStateVector statePatientCategorical = ", statePatientCategorical)
  return statePatientCategorical
}

function createStateVector(session, patient_id) {
   console.log("createStateVector patient_id = ", patient_id, "createStateVector session.patient = ", session.temp_patient)
  let patient = undefined
  if (session.patient_id === undefined || session.patient_id === null) {
    patient = session.temp_patient;
    createStateVectorForPatient(patient)
  } else {
    Patient.findById(patient_id, (err, p) => {
      if(err === undefined) {
        console.error("compute.createStateVector session exists, patient not found");
        patient = session.temp_patient
      }
      console.log('compute.createStateVector patient = ', p)
      createStateVectorForPatient(patient)
    })
  }


}

function compute(session, res, currentQuestion, answers, nextQuestion=null, options=null, newSession=false, command=null, reset=false, patient_id=null){
  console.log('computing()')
  let question = null
  if (newSession || reset){
    // TODO : identify whether user is new or old and select message accordingly
    console.log('LOG compute(). *NEW SESSION*')
    nextQuestion='-1.0 Consent message' // set next question as initial question if fresh session
  }
  else {
    // old session
    console.debug('command = ', command,
      '. currentQuestion = ', currentQuestion.id,
      '. currentQuestion.type = ', currentQuestion.type,
      '. currentQuestion.type === TYPE_ANALYSE = ', currentQuestion.type === TYPE_ANALYSE,
      '. currentQuestion && currentQuestion.type === TYPE_ANALYSE = ', currentQuestion && currentQuestion.type === TYPE_ANALYSE,
      '. currentQuestion && currentQuestion.type === TYPE_ANALYSE && command = ', currentQuestion && currentQuestion.type === TYPE_ANALYSE && command)

    fetchState()
    analyzeStatement()
    //runCommand()
    setFacts(session, currentQuestion, answers, patient_id)

    createStateVector(session, patient_id)

    if (typeof options == 'string') {
      // Options generated by a command
      console.error("compute options. Unhandled scenario")
      options = commands[options](answers, currentQuestion);
    }
    nextQuestion = runCommand(question, currentQuestion, nextQuestion, command, answers)
  }
  question = actionMessage(question, currentQuestion, nextQuestion);

  // console.log("question = ", question)
  res = prepareResult(res, question)
  return res
}

module.exports = { compute }