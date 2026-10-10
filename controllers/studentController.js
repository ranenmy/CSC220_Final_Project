const Record = require('../models/Record');
const Offering = require('../models/Offering');
const User = require('../models/User');

const rules = require('../services/eligibilityService');
const { id, term, fail } = require('../services/api');


// GET ALL ACTIVE STUDENTS
// Advisor only

exports.getStudents = async (req, res) => {

    const students = await User.find({
        role: 'student',
        active: true
    })
    .select('-passwordHash')
    .sort({ name: 1 });

    res.json(students);
};


// GET STUDENT ACADEMIC RECORD

exports.getRecord = async (req, res) => {

    id(req.params.id);

    if (
        req.user.role === 'student' &&
        String(req.user._id) !== req.params.id.toLowerCase()
    ) {
        fail(
            403,
            'You can only view your own record'
        );
    }

    await rules.student(req.params.id);

    const records = await Record
        .find({
            studentId: req.params.id
        })
        .populate('courseId')
        .sort({
            term: 1
        });

    res.json(records);
};

// GET ELIGIBLE COURSES

exports.getEligible = async (req, res) => {

    id(req.params.id);

    term(req.query.term);

    const student = await rules.student(req.params.id);

    const offerings = await Offering.find({
            term: req.query.term
        });

    const result = [];

    for (const offering of offerings) {

        const reasons = await rules.reasons( student, offering);

        result.push({
         offeringId: offering._id,
         courseId: offering.courseId,
         section: offering.section,
         eligible: reasons.length === 0,
         reasons

        });
    }

    res.json(result);
};