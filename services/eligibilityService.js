const User = require('../models/User');
const Offering = require('../models/Offering');
const Registration = require('../models/Registration');
const Record = require('../models/Record');
const { fail, overlaps } = require('./api');
exports.student = async (id, session = null) => {
    const user = await User.findById(id).session(session);
    if (!user || user.role !== 'student') fail(404, 'Student not found');
    return user;
};
exports.reasons = async (student, offering, session = null) => {
    const reasons = [];
    if (!student.active) reasons.push('Student account is inactive');
    if (!offering.addDropOpen) reasons.push('Add/drop is closed');
    const count = await Registration.countDocuments({ offeringId: offering._id, status: 'registered' }).session(session);
    if (count >= offering.seats) reasons.push('Section is full');
    const records = await Record.find({ studentId: student._id, courseId: offering.courseId }).session(session);
    if (records.some(r => ['A','A+','A-','B+','B','B-','C+','C','C-','D+','D'].includes(r.grade))) reasons.push('Already passed this course');
    const registrations = await Registration.find({ studentId: student._id, term: offering.term, status: 'registered' }).session(session);
    const others = await Offering.find({ _id: { $in: registrations.map(r => r.offeringId) } }).session(session);
    if (others.some(o => String(o.courseId) === String(offering.courseId))) reasons.push('Already registered for this course');
    if (others.some(o => overlaps(o, offering))) reasons.push('Student timetable conflict');
    const current = records.filter(r => r.term === offering.term);
    if (current.some(r => !['IN PROGRESS','W'].includes(r.grade))) reasons.push('This term already has a completed grade');
    return reasons;
};
