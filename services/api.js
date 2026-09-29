const mongoose = require('mongoose');
const Lock = mongoose.model('ApiWriteLock', new mongoose.Schema({ _id: String, version: Number }));
exports.fail = (status, message) => { const error = new Error(message); error.status = status; throw error; };
exports.id = value => { if (typeof value !== 'string' || !mongoose.isObjectIdOrHexString(value)) exports.fail(400, 'Use a valid MongoDB document ID'); return value; };
exports.term = value => { if (typeof value !== 'string' || !/^\d{4}-[1-3]$/.test(value)) exports.fail(400, 'Use a term such as 2026-1'); return value; };
exports.body = (body, allowed) => {
    if (!body || typeof body !== 'object' || Array.isArray(body)) exports.fail(400, 'A JSON object is required');
    for (const key of Object.keys(body)) if (!allowed.includes(key)) exports.fail(400, `Field not allowed: ${key}`);
    return body;
};
exports.overlaps = (a, b) => a.term === b.term && a.day === b.day && a.startTime < b.endTime && b.startTime < a.endTime;
// All API mutations share this lock inside a transaction. This deliberately
// serializes writes for this small project, including timetable and capacity checks.
exports.write = async work => {
    await Lock.updateOne({ _id: 'writes' }, { $setOnInsert: { version: 0 } }, { upsert: true });
    return mongoose.connection.transaction(async session => {
        await Lock.updateOne({ _id: 'writes' }, { $inc: { version: 1 } }, { session });
        return work(session);
    });
};
