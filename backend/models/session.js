const mongoose = require('mongoose');

const { Schema } = mongoose;

const Content = new Schema({
  en: String,
  hi: String,
  bn: String,
  description_image: String
  });

const Option = new Schema({
    next_question: String,
    statement: Content,
    value: String
  });

const Question = new Schema({
  id: String,
  next_question: String,
  statement: Content,
  options: [Option],
  value: String
});

const AnswerFormat = new Schema({
  type: String,
  options: [Option],
  pattern: String
})

// create a schema
const SessionSchema = new Schema(
  {
    messages: [{
      statement: String,
      messageType: String,
      direction: String,
      index: Number,
      answerFormat: AnswerFormat,
      nextQuestion: String,
      optionSelected: String,
      options: [Option],
      question: Question,
      timestamp: Number,
      patient_id: String,
    }],
    patient_id: String
  }
);

// create the model
const Session = mongoose.model('Session', SessionSchema, 'sessions');

// export the model
module.exports = Session;
