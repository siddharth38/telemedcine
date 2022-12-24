const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const SessionSchema = new Schema(
  {
    messages: [{
      statement: String,
      messageType: String,
      direction: String,
      index: Number
    }]
  }
);

// create the model
const Session = mongoose.model('Session', SessionSchema, 'sessions');

// export the model
module.exports = Session;
