const mongoose = require('mongoose');

const yearWiseSchema = new mongoose.Schema({}, { strict: false });

const chapterSchema = new mongoose.Schema({
  subject: String,
  chapter: String,
  class: String,
  unit: String,
  yearWiseQuestionCount: yearWiseSchema,
  questionSolved: Number,
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] },
  isWeakChapter: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);
