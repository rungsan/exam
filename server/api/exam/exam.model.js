'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExamSchema = new Schema({
  year: Date,
  level: String,
  title: String,
  section: String,
  item: [{
    quiz: String,
    choices: [{
      choice: String,
      correct: Boolean,
      hit: Number
    }],
  }]
});

module.exports = mongoose.model('Exam', ExamSchema);
