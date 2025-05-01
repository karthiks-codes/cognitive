const Assessment = require("../models/Assessment");


const saveAssessment = async (req, res) => {
    try {
        const { results, userId } = req.body;

        // Create a new assessment
        const assessment = new Assessment({
            userId,
            results
        });

        // Save the assessment
        await assessment.save();

        return res.status(200).json({ msg: 'Answers saved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

const getAssessments = async (req, res) => {
    try {
        const {userId} = req.body;
        const assessments = await Assessment.find({userId});
        return res.status(200).json(assessments);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { saveAssessment, getAssessments };
