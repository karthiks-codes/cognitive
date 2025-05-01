const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: String,
  type: String,
  text: String,
  options: [String],
  correctAnswer: String,
  userAnswer: String
});

const sectionResultSchema = new mongoose.Schema({
  sectionId: String,
  sectionTitle: String,
  total: Number,
  score: Number,
  percentage: Number,
  questions: [questionSchema]
});

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  results: {
    score: Number,
    total: Number,
    percentage: Number,
    sectionResults: [sectionResultSchema]
  }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);