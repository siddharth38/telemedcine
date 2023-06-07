const { questions, CONTENT_VARIANT_NAME, CONTENT_VARIANTS, STATEMENT,
  NEXT_QUESTION_LIST, NEXT_QUESTION_VARIANTS, USUAL_ASK, NEXT_QUESTION,
  DEFAULT_ASK, VARIANT_PROBABILITY, OPTIONS, OPTION_STATEMENT_VARIANTS,
  OPTION_VARIANT_NAME, SKIP_PROBABILITY, FACT, ID, COMMAND, TYPE
} = require("../data/questions");
const { TYPE_ANALYSE, TYPE_NONE, TYPE_BUTTON } = require("../helper/values");
const { commands } = require("../data/commands");
const Patient = require('../models/patient');
const Session = require('../models/session');
const { stateVectorMap } = require("../data/fact-state-vector_mapping");
const Message = require("../models/conversationgraph");
const { updatePatientWithFacts } = require("../helper/index")
const { stateToNodeMapping } = require("../data/state-action-mapping");
const { options } = require("mongoose/lib/utils");
const { getCurrentSelectedOption } = require("./computeHelper");
const { nlu } = require("./nlu");
const { chatGPTGeneration } = require("./nlg");

// TODO Thompson sampling

function randomSelection(parent, list){
  return Math.floor(Math.random() * parent[list].length)
}

// not actually epsilon greedy. best is checked based on best's probability
// [x,y] : x is index, y is probability
function stochasticSelection(probabilities){
  probabilities.sort((a, b) => {
    if (a[1]<b[1]) return 1     // b will be placed before a
    else return -1              // a will be placed before b
  })
  let total_probability = 0
  for (let i =0; i<probabilities.length; i++){
    total_probability+= probabilities[i][1]
  }
  for (let i =0; i<probabilities.length; i++){
    let p = Math.random() * total_probability
    // console.log('compute stochasticSelection : p = ', p)
    if (p < probabilities[i][1]) return probabilities[i][0]
  }
  return probabilities[probabilities.length-1][0]
}

function makeProbabilityList(parent, list){
  let probabilities = []
  for (let i = 0; i<parent[list].length; i++){
    if (parent[list][i][VARIANT_PROBABILITY]!==undefined) {
      probabilities.push([i, parent[list][i][VARIANT_PROBABILITY]])
    }
  }
  return probabilities
}

function selectContentVariant(question){
  // if(question!==null) console.log('compute.SelectContentVariant. 0 question[ID] = ', question[ID], '. question[NEXT_QUESTION] = ', question[NEXT_QUESTION])
  if (question && question[CONTENT_VARIANTS] !== undefined) {
    console.log("question[CONTENT_VARIANTS].length = ", question[CONTENT_VARIANTS].length)
    let probabilities = makeProbabilityList(question, CONTENT_VARIANTS)
    let index = null
    if (probabilities && probabilities.length>0) index = stochasticSelection(probabilities, question)
    else index = randomSelection(question, CONTENT_VARIANTS)
    console.log("compute.SelectContentVariant. selectedVariant. index = ",  index, ". variant", question[CONTENT_VARIANTS][index])
    question[STATEMENT] = question[CONTENT_VARIANTS][index][STATEMENT]
    question[CONTENT_VARIANT_NAME] = question[CONTENT_VARIANTS][index][CONTENT_VARIANT_NAME]
  }
  return question
}

function getQuestionById(questions, id){
  for (let i = 0; i < questions.length; i++) {
    if (questions[i][ID] === id) return JSON.parse(JSON.stringify(questions[i]));                 // otherwise the original object gets modified. replace with structuredClone() later
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
  console.log("compute selectNextQuestionFromList question.id = ", question[ID])

  let defaultAsk = undefined
  let index = undefined
  let probabilities = makeProbabilityList(question, NEXT_QUESTION_LIST)
  if (probabilities && probabilities.length>0) index = stochasticSelection(probabilities, question)
  if (index) {
    question[NEXT_QUESTION] = question[NEXT_QUESTION_LIST][index][NEXT_QUESTION];
    return
  }
  // else select default
  for (let i=0; i<question[NEXT_QUESTION_LIST].length; i++) {
    if (question[NEXT_QUESTION_LIST][i][DEFAULT_ASK] === true) defaultAsk = i
  }
  if (defaultAsk) {
    console.log('default ask for nextQuestion variant')
    question[NEXT_QUESTION] = question[NEXT_QUESTION_LIST][defaultAsk][NEXT_QUESTION]
    return
  }
  // else select random
  console.log('selecting nextQuestion variant randomly')
  index = randomSelection(question, NEXT_QUESTION_LIST)
  question[NEXT_QUESTION] = question[NEXT_QUESTION_LIST][index][NEXT_QUESTION]
}

function selectOptionStatementVariant(question, skipList) {
  console.log('compute.selectOptionStatementVariant question[OPTIONS].length = ', question[OPTIONS].length)
  for (let optionIndex = 0; optionIndex<question[OPTIONS].length; optionIndex++) {
    if (question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS] !== undefined &&
    !skipList.includes(optionIndex)) {
      // if not suppressed use, else ignore
      let statementVariantIndex = undefined
      let probabilities = makeProbabilityList(question[OPTIONS][optionIndex], OPTION_STATEMENT_VARIANTS)
      if (probabilities && probabilities.length>0) statementVariantIndex = stochasticSelection(probabilities, question[OPTIONS][optionIndex])
      // statementVariantIndex = randomSelection(question[OPTIONS][optionIndex], OPTION_STATEMENT_VARIANTS)
      //let index = Math.floor(Math.random() * question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS].length)
      // console.log("question[CONTENT_VARIANTS].length = ", question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS].length)
      // console.log("index = ", index)
      // console.log("question[CONTENT_VARIANTS][index] = ", question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS][index])
      question[OPTIONS][optionIndex][STATEMENT] = question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS][statementVariantIndex][STATEMENT]
      question[OPTIONS][optionIndex][OPTION_VARIANT_NAME] = question[OPTIONS][optionIndex][OPTION_STATEMENT_VARIANTS][statementVariantIndex][CONTENT_VARIANT_NAME]
      question[OPTIONS][optionIndex].skip = false
    }
    else question[OPTIONS][optionIndex].skip = skipList.includes(optionIndex);
    // console.log('selectOptionStatementVariant question[OPTIONS][optionIndex] skipList.includes(optionIndex) = ', skipList.includes(optionIndex))
  }
  return question
}

function selectOptionNextQuestion(question, skipList) {
  console.log("select next question from options")
  for (let optionIndex = 0; optionIndex<question[OPTIONS].length; optionIndex++) {
    // continue if contained in skipList
    if (skipList!==undefined && skipList.includes(optionIndex)) continue
    // for every option
    if (question[OPTIONS][optionIndex][NEXT_QUESTION_LIST] === undefined) {
      // console.log("selectOptionNextQuestion: no nextQuestion list exists. deciding the simple way")
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

function fetchConversationState(){
  // TODO
}

function fetchPatientState(){
  // TODO
}

function fetchState(){
  // compare with get Facts and figure out something
  fetchConversationState()
  fetchPatientState()
}

function analyzeStatement(customText, currentQuestion){
  // TODO
  if (customText) return nlu(customText, currentQuestion, questions)
}

function setFacts(session, currentQuestion, answers, patient_id=undefined){
    // console.log('setFacts(). currentQuestion.id = ', currentQuestion.id, '. answers.id = ', answers.id,
    //   '. answers[currentQuestion.id] = ', answers[currentQuestion.id])

    if (currentQuestion.options) {  // button
      // console.log('LOG setFacts(). currentQuestion.options = ', currentQuestion.options)
      // console.log('LOG setFacts(). currentQuestion.options.selectedOption = ',
      //   currentQuestion.options[answers[currentQuestion.id]])
      let selectedOption = getCurrentSelectedOption(currentQuestion, answers)
      let fact =
        (selectedOption !== undefined && selectedOption !== null )
          ? selectedOption[FACT] : undefined
      // console.log('LOG setFacts(). fact = ', fact)
      let db_value = selectedOption ? selectedOption.dbValue : null
      let value = selectedOption ? selectedOption.value : null
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

function runCommand(question, currentQuestion, nextQuestion, command, answers, patient_id, session){
  console.log('compute.runCommand(). commands = ', commands)
  if (currentQuestion && currentQuestion.type === TYPE_NONE && command) {
    // run a task/command
    // console.debug('statement followed by command')
    // console.log('command = ', command, '. commands[command] = ', commands[command])
    nextQuestion = commands[command](answers, currentQuestion, patient_id, session);
    // console.debug('nextQuestion = ', nextQuestion)
  }
  else if (currentQuestion && currentQuestion.type === TYPE_ANALYSE && command) {
    // run a task/command
    // console.log('command = ', command)
    // console.log('commands = ', commands)
    // console.log('commands[command] = ', commands[command])
    // console.log('commands[command].type = ', commands[command].type)
    nextQuestion = commands[command](answers, currentQuestion, questions, patient_id, session);
    // console.debug('analysis command')
    // console.debug(nextQuestion)
  }
  else if (currentQuestion && currentQuestion.type === TYPE_NONE && nextQuestion) {
  // simple statement
  // Without delay, the present question may not get rendered
  // console.log("simple statement. nextQuestion = ", nextQuestion)
  // if (this.questions!==undefined) ;
  // else {
  // 	//default;
  // }
  }
  else if (currentQuestion.type === TYPE_BUTTON && currentQuestion){
    let currentSelectedOption = getCurrentSelectedOption(currentQuestion, answers)
    if (currentSelectedOption && currentSelectedOption[COMMAND]){
      nextQuestion = commands[command](answers, question, session, patient_id)
    }

  }
  return nextQuestion
}

function selectOptions(question){
  let skipList = []
  for (let optionIndex = 0; optionIndex<question[OPTIONS].length; optionIndex++) {
    if (question[OPTIONS][optionIndex][SKIP_PROBABILITY] !== undefined &&
      Math.random() < question[OPTIONS][optionIndex][SKIP_PROBABILITY]) {
      console.log("compute.skipList : skipping option index = ", optionIndex)
      skipList.push(optionIndex);
    }
  }
  console.log("compute.selectOptions : skipList = ", skipList)
  return skipList
}

function prepareMessageContentAndOptions(question, currentQuestion, nextQuestion){
  question = selectContentVariant(getQuestionById(questions, nextQuestion))
  if (question && question.type === TYPE_BUTTON) {
    let skipList = selectOptions(question)
    selectOptionStatementVariant(question, skipList)
    selectOptionNextQuestion(question)
  }
  return question
}

async function actionMessage(question, currentQuestion, nextQuestion, customText, generateGeneric) {
  // action
  if(generateGeneric) {
    console.log('compute.actionMessage : generating Generic')
    const generatedResponse = await chatGPTGeneration(customText)
    return { [STATEMENT]: generatedResponse, [TYPE]: TYPE_NONE };
  }
  else {
    question = prepareMessageContentAndOptions(question, currentQuestion, nextQuestion);
    if (question[NEXT_QUESTION] === undefined && question[NEXT_QUESTION_LIST] !== undefined) selectNextQuestionFromList(question);
    return question;
  }
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

function calculateDurationReward(userReplyDuration){
  let durationReward = 0
  // based on duration
  console.log("compute.calculateReward userReplyDuration = ", userReplyDuration, "ms")
  let seconds = userReplyDuration/1000
  durationReward = (15-seconds)/Math.abs(Math.floor(Math.sqrt(seconds)))
  // if (seconds<10) durationReward += 1
  // else if (seconds>20) durationReward -= Math.sqrt(seconds/20)
  return durationReward
}

function calculateOptionReward(answers, currentQuestion){
  console.log('compute.calculateOptionReward : currentQuestion.id = ', currentQuestion[ID])
  if (currentQuestion[OPTIONS]===undefined) return 0
  let option = currentQuestion[OPTIONS][answers[currentQuestion[ID]]]
  console.log('compute.calculateReward : option = ', option, '. [answers[currentQuestion[ID]] = ', answers[currentQuestion[ID]], )
  return {
    questionID:currentQuestion[ID],
    optionName:answers[currentQuestion[ID]],
    optionVariant: (option && option[OPTION_STATEMENT_VARIANTS])
      ? option[OPTION_STATEMENT_VARIANTS][OPTION_VARIANT_NAME]
      : null,
    reward:1}
}

function getResetReward(currentQuestion, reset){
  let reward = null
  if (reset) reward = -15
  return { currentQuestion, reward }
}

function calculateRewards(userReplyDuration, answers, currentQuestion, reset){
  let durationReward = calculateDurationReward(userReplyDuration)

  // based on selection
  let optionReward = calculateOptionReward(answers, currentQuestion)
  let resetReward = getResetReward(currentQuestion, reset)

  // based on sentiment
  return { durationReward, optionReward, resetReward }
}

function updateWeights(reward, currentQuestion, answers){
  let answer = null
  if (currentQuestion[OPTIONS] !== undefined) {
    answer = currentQuestion[OPTIONS][answers[currentQuestion.id]];
    if (answer && answer[STATEMENT]) {
      Message.findOne(
        {
          $and: [
            { [ID]: currentQuestion.id },
            {
              [`${CONTENT_VARIANTS}.${CONTENT_VARIANT_NAME}`]: {
                $eq: `${answer[STATEMENT][CONTENT_VARIANT_NAME]}`
              }
            }
          ]
        }, (err, message) => {
          console.log("compute.updateWeights: mongoose query 1. message = ", message, ". err = ", err);
        });
    }
  }
  // Message.findOne({[ID]:currentQuestion.id}, (err, message)=> {
  //   if (message){
  //     if(message[STATEMENT][CONTENT_VARIANT_NAME]){
  //       message[CONTENT_VARIANTS].forEach((variant)=>{
  //         if (variant[CONTENT_VARIANT_NAME]===answer[STATEMENT][CONTENT_VARIANT_NAME]){
  //           variant[VARIANT_PROBABILITY] += reward*variant[VARIANT_PROBABILITY]/10
  //           Message.findOneAndUpdate({$and:
  //               [
  //                 {[ID]:currentQuestion.id},
  //                 { `${CONTENT_VARIANTS}.${variant[CONTENT_VARIANT_NAME]}` }
  //               ]})
  //         }
  //       })
  //     }
  //   }
  // })
}

async function compute(session, res, currentQuestion, answers,
                 nextQuestion=null, options=null,
                 newSession=false, command=null,
                 reset=false, patient_id=null,
                 userReplyDuration=null, customText=null){
  console.log('computing()')
  let question = null
  let generateGeneric = false
  console.log("compute : reset = ", reset)
  if ((newSession || reset) && !customText){
    // TODO : identify whether user is new or old and select message accordingly
    console.log('compute(). *NEW SESSION*')
    nextQuestion='-1.0 Consent message' // set next question as initial question if fresh session
  }
  else {
    // old session
    console.debug(`currentQuestion = ${currentQuestion.id}. customText = ${customText}. command = ${command}. 
    currentQuestion.type = ${currentQuestion.type}. currentQuestion.type === TYPE_ANALYSE = ${currentQuestion.type === TYPE_ANALYSE}
    currentQuestion && currentQuestion.type === TYPE_ANALYSE = ${currentQuestion && currentQuestion.type === TYPE_ANALYSE}
    currentQuestion && currentQuestion.type === TYPE_ANALYSE && command = ${currentQuestion && currentQuestion.type === TYPE_ANALYSE && command}`)

    fetchState()
    let analysis = analyzeStatement(customText, currentQuestion)
    if (analysis) {
      nextQuestion = analysis[NEXT_QUESTION]
      generateGeneric = analysis.generateGeneric
    }
    //runCommand()
    setFacts(session, currentQuestion, answers, patient_id)

    let reward = calculateRewards(userReplyDuration, answers, currentQuestion)
    updateWeights(reward, currentQuestion, answers)

    // TODO : currently returns nothing
    createStateVector(session, patient_id)

    // if(!nextQuestion) {
    nextQuestion = runCommand(question, currentQuestion, nextQuestion, command, answers, patient_id);
    // console.log(`compute.oldSession through runCommand = ${nextQuestion}`)
    // }
    // else {
    //   console.log(`compute : nextQuestionThroughAnalysis = ${nextQuestion}`)
    // }
  }
  question = await actionMessage(question, currentQuestion, nextQuestion, customText, generateGeneric);

  console.log("compute.question = ", question)
  res = prepareResult(res, question)
  return res
}

module.exports = { compute }