const {
  questions, OPTIONS, STATEMENT, ID, NEXT_QUESTION, STATEMENT_YES, STATEMENT_NO, STATEMENT_TRUE, STATEMENT_FALSE,
  STATEMENT_WHY_NOT, LANG_ENGLISH, LANG_HINDI
} = require("../data/questions");
// const { SimilarSearch, NerManager } = require("node-nlp");
const { leven } = require("@nlpjs/similarity");
const StringSimilarity = require("string-similarity");

let genericEntities = [STATEMENT_YES, STATEMENT_NO, STATEMENT_TRUE, STATEMENT_FALSE, STATEMENT_WHY_NOT];

function compareStatements(langStatement, customText){
  let s = StringSimilarity.compareTwoStrings(langStatement, customText)
  // console.log(`compute.nlu.selectStatement : langStatement = ${langStatement}, customText = ${customText}, similarity = ${s}`)
  if (s > 0.5) return true;
}

function selectStatement(statement, customText) {
  let languages = [LANG_ENGLISH, LANG_HINDI]
  // console.log(`compute.nlu.selectStatement : statement = ${statement}. statementKeys = ${statement.keys}, statement.length = ${statement.length}, statement.hi = ${statement[LANG_HINDI]}`)
  for (let langIndex = 0; langIndex < languages.length; langIndex++) {
    let langStatement = statement[languages[langIndex]];
    if (langStatement === undefined || langStatement === null) return
    if (compareStatements(langStatement, customText)) return true

    // if (leven(langStatement, customText) / customText.length < 0.2)
  }
   // for (let langIndex = 0; langIndex < statement.length; langIndex++) {
  //   // let langStatement = statement[languages[langIndex]];
  //   let langStatement = statement[statement[langIndex]];
  //   console.log(`compute.nlu.selectStatement : langStatement = ${langStatement}, customText = ${customText}`)
  //   // console.log(`compute.nlu.selectStatement : langStatement = ${langStatement}`)
  //   if (leven(langStatement, customText) / customText.length < 0.2)
  //     return langStatement;
  // }
}

function selectOption(options, customText) {
  console.log(`nlu.selectOptions options.length = ${options.length}`)
  for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
    let statement = options[optionIndex][STATEMENT];
    if (statement && selectStatement(statement, customText))
      return { nextQuestion: options[optionIndex][NEXT_QUESTION] };
  }
  console.log(`nlu.selectOptions no option found}`)
}

function nlu(customText, currentQuestion) {
  // -1. sanitize for analysis
  // 0. compare with options. done
  // const similar = new SimilarSearch();
  console.log(`compute.nlu.customText = ${customText}`)
  let analysis;
  console.log(`nlu : currentQuestion.id = `, currentQuestion.id)
  let options = currentQuestion[OPTIONS];
  if (options) analysis = selectOption(options, customText);
  if (analysis) return analysis;

  // check if genericEntity
  let genericEntity = false;
  for (let entityIndex = 0; entityIndex < genericEntities.length; entityIndex++) {
    if (selectStatement(genericEntities[entityIndex], customText)) genericEntity = true;
  }

  if (!genericEntity) {
    // compare with all options
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
      let question = questions[questionIndex];
      let options = question[OPTIONS];
      if (options) {
        analysis = selectOption(options, customText);
      }
      if (analysis) return analysis;
    }
    // compare with all IDs
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
      if (leven(questions[questionIndex][ID], customText) / customText.length < 0.3)
        return { nextQuestion: questions[questionIndex][ID] };
    }
    // compare with all statements
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
      let question = questions[questionIndex];
      let statement = question[STATEMENT];
      if (statement && selectStatement(statement, customText))
        return { nextQuestion: question[questionIndex] };
    }
  }
  // chatgpt
  return { generateGeneric: true };
  // 1. compare statement relevance
  // 2. semantics and ontologies
  // 3. compare again
  // 4. search
  // TODO: reward where needed
}

module.exports = { nlu };