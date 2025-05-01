const express = require('express');
const authController = require('../controllers/auth');
const { saveAssessment, getAssessments } = require('../controllers/assesment');

const router = express.Router();


router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// Save assessment results
router.post('/assessment/save', saveAssessment);
router.post('/assessment/history', getAssessments);

module.exports = router;