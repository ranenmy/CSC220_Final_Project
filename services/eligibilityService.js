
const User = require('../models/User');
const Offering = require('../models/Offering');
const Registration = require('../models/Registration');
const Record = require('../models/Record');
const { fail, overlaps } = require('./api');

const passingGrades = ['A', 'A+', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'];

exports.student = async (id, session = null) => {
  const user = await User.findById(id).session(session);
  if (!user || user.role !== 'student') fail(404, 'Student not found');
  return user;
};

exports.reasons = async (student, offering, session = null) => {
  const reasons = [];

  if (!student.active) {
    reasons.push('Student account is inactive');
  }

  const count = await Registration.countDocuments({
    offeringId: offering._id,
    status: 'registered'
  }).session(session);

  if (count >= offering.seats) {
    reasons.push(`Full — 0 seats remaining`);
  }

  const records = await Record.find({
    studentId: student._id,
    courseId: offering.courseId
  }).session(session);

  const passedRecord = records.find(r => passingGrades.includes(r.grade));

  if (passedRecord) {
    reasons.push(`Already passed — grade ${passedRecord.grade}`);
  }

  const failedRecord = records.find(r => r.grade === 'F');

  if (failedRecord) {
    reasons.push('Retake required');
  }

  const registrations = await Registration.find({
    studentId: student._id,
    term: offering.term,
    status: 'registered'
  }).session(session);

  const others = await Offering.find({
    _id: { $in: registrations.map(r => r.offeringId) }
  }).populate('courseId').session(session);

  if (others.some(o => String(o.courseId?._id || o.courseId) === String(offering.courseId))) {
    reasons.push('Already registered for this course');
  }

  const clash = others.find(o => overlaps(o, offering));

  if (clash) {
    const courseName = clash.courseId?.code || 'another course';
    reasons.push(`Clashes with ${courseName} Section ${clash.section}`);
  }

  return reasons;
};
