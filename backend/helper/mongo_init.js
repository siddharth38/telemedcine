// const Weights = require("../models/stochasticweights");
const Message = require("../models/conversationgraph");
const { questions, ID } = require("../data/questions");

function updateConversationGraph() {
  Message.find(
    { [ID]: { "$ne": "null" } },
    (err, messages) => {
      console.log("Messages.length = ", err, messages.length);
      if (err) {
        // nothing exists. push everything
        questions.forEach((question) => {
          Message.create(question);
        });
      } else {
        if (messages.length !== questions.length) {
          // console.log('messages.length = ', messages.length, '. questions.length = ', questions.length)
          // push only new messages
          questions.forEach((question) => {
            Message.findOne({ [ID]: question[ID] }).then((message) => {
              // console.log('message = ', message)
              if (message === undefined || message === null) {
                console.log("missing message ID = ", question[ID])
                Message.create(question);
              }
              // else {
              //   // console.log("found ID : ", question[ID])//, "message[ID] = ", message[ID])
              // }
            });
          });
        }
      }
    });
}

// function initializeWeights() {
//   console.log('Weights.GraphStatementWeights = ', Weights.GraphStatementWeights)
//   Weights.find({"$ne":"null"}, (err, _)=>{
//     if (err){
//       Weights.create({GraphStatementWeights:[],
//         GraphNextQuestionWeights:[],
//         GraphOptionsWeights:[]})
//     }
//   })
//
//   questions.forEach((question) => {
//     // set values in DB
//     if (question[CONTENT_VARIANTS] !== undefined) {
//       question[CONTENT_VARIANTS].forEach((statement_variant) => {
//         // console.log("log statement_variant = ", statement_variant)
//         Weights.findOne({"$ne":"null"}, ())
//         // console.log('GraphWeightsModel.GraphWeightsModel = ', GraphWeightsModel.GraphWeightsModel)
//         // GraphWeightsModel.GraphWeights.find('', (x)=>console.log('found ', x))
//         // console.log('GraphWeightsModel.GraphWeightsModel = ', GraphWeightsModel.GraphWeights.find().forEach(console.log('event'))
//       });
//     }
//     // setNextQuestionWeight()
//     // setOptionsStatementWeight()
//     // setOptionsNextQuestionWeight()
//     // setOptionsSkipWeight()
//   });
// }

module.exports = { updateConversationGraph };