const mongoose = require('mongoose');
const { FACT, ID, TYPE, CONTENT_VARIANTS, NEXT_QUESTION_LIST, OPTIONS, STATEMENT, CONTENT_VARIANT_NAME, BRANCHES,
  DB_VALUE, VALUE, COMMAND, OPTION_STATEMENT_VARIANTS, OPTION_VARIANT_NAME, VARIANT_PROBABILITY, NEXT_QUESTION,
  LANG_BANGLA, LANG_HINDI, LANG_ENGLISH, DESCRIPTION_IMAGE
} = require('../data/questions')

const { Schema } = mongoose;

const StatementSchema = new Schema({
  [DESCRIPTION_IMAGE]:String,
  [LANG_ENGLISH]:String,
  [LANG_HINDI]:String,
  [LANG_BANGLA]:String
})

const OptionStatementVariantSchema = new Schema({
  [CONTENT_VARIANT_NAME]:String,
  [STATEMENT]:StatementSchema
})

const FactSchema = new Schema({
  value:String,
  category:String,
  type:String,
  group:String,
  state:String
})

const NextQuestionSchema = new Schema({
  [NEXT_QUESTION]:String,
  [VARIANT_PROBABILITY]:Number
})

const OptionSchema = new Schema({
  [OPTION_VARIANT_NAME]: String,
  [OPTION_STATEMENT_VARIANTS]:[OptionStatementVariantSchema],
  [COMMAND]:String,
  [VALUE]:String,
  [DB_VALUE]:String,
  [BRANCHES]:[String],
  [FACT]:[FactSchema],
  [NEXT_QUESTION_LIST]:[NextQuestionSchema]
})

const ContentSchema = new Schema({
  [CONTENT_VARIANT_NAME]: String,
  [STATEMENT]:StatementSchema,
  [VARIANT_PROBABILITY]: String
})

// create a schema
const MessageSchema = new Schema({
  [ID]:String,
  [STATEMENT]:[StatementSchema],
  [OPTIONS]:[OptionSchema],
  [NEXT_QUESTION_LIST]:[NextQuestionSchema],
  [CONTENT_VARIANTS]:[ContentSchema],
  [TYPE]:String,
  [NEXT_QUESTION]:String
});

// create the model
const Message = mongoose.model('Message', MessageSchema, 'messages');

// export the model
module.exports = Message;