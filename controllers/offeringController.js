const Offering = require('../models/Offering');
const Course = require('../models/Course');
const Registration = require('../models/Registration');
const { body,id,term,fail,write,overlaps }=require('../services/api');
const fields=['courseId','term','section','day','startTime','endTime','room','instructor','seats','addDropOpen'];
async function validate(o, session) {
    id(String(o.courseId)); term(o.term);
    if(!await Course.findById(o.courseId).session(session)) fail(404,'Course not found');
    if(!Number.isInteger(o.section)||o.section<1||!Number.isInteger(o.seats)||o.seats<1) fail(400,'Section and seats must be positive integers');
    if(!['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].includes(o.day)) fail(400,'Invalid day');
    const time=/^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if(!time.test(o.startTime)||!time.test(o.endTime)||o.startTime>=o.endTime) fail(400,'Use HH:mm times with start before end');
    if(typeof o.addDropOpen!=='boolean') fail(400,'addDropOpen must be a boolean');
    for(const key of ['room','instructor']) if(typeof o[key]!=='string'||!o[key].trim()) fail(400,`${key} is required`);
    const others=await Offering.find({_id:{$ne:o._id},term:o.term}).session(session);
    if(others.some(b=>String(b.courseId)===String(o.courseId)&&b.section===o.section)) fail(409,'Course section already exists for this term');
    if(others.some(b=>overlaps(o,b)&&(b.room.trim().toLowerCase()===o.room.trim().toLowerCase()||b.instructor.trim().toLowerCase()===o.instructor.trim().toLowerCase()))) fail(409,'Room or instructor timetable conflict');
    const enrolled=await Registration.find({offeringId:o._id,status:'registered'}).session(session);
    if(enrolled.length>o.seats) fail(409,'Capacity cannot be smaller than enrollment');
    const otherRegs=await Registration.find({studentId:{$in:enrolled.map(r=>r.studentId)},term:o.term,status:'registered',offeringId:{$ne:o._id}}).session(session);
    const otherIds=new Set(otherRegs.map(r=>String(r.offeringId)));
    if(others.some(b=>otherIds.has(String(b._id))&&overlaps(o,b))) fail(409,'Schedule conflicts with an enrolled student');
    o.seatsTaken=enrolled.length;
}
exports.getOfferings=async(req,res)=>{term(req.query.term);res.json(await Offering.find({term:req.query.term}).populate('courseId'));};
exports.createOffering=async(req,res)=>{
    const input=body(req.body,fields); if(input.courseId!==undefined)id(input.courseId);
    const result=await write(async session=>{const o=new Offering({...input,seatsTaken:0});await validate(o,session);await o.save({session});return o;});res.status(201).json(result);
};
exports.updateOffering=async(req,res)=>{
    id(req.params.id);const input=body(req.body,fields);if(input.courseId!==undefined)id(input.courseId);
    const result=await write(async session=>{
        const o=await Offering.findById(req.params.id).session(session);if(!o)fail(404,'Offering not found');
        if(await Registration.exists({offeringId:o._id}).session(session)) {
            if((input.courseId&&input.courseId!==String(o.courseId))||(input.term&&input.term!==o.term))fail(409,'Cannot change course or term of a referenced offering');
        }
        Object.assign(o,input);await validate(o,session);await o.save({session});return o;
    });res.json(result);
};
exports.deleteOffering=async(req,res)=>{
    id(req.params.id);await write(async session=>{
        if(!await Offering.findById(req.params.id).session(session))fail(404,'Offering not found');
        if(await Registration.exists({offeringId:req.params.id}).session(session))fail(409,'Offering has registration history and cannot be deleted');
        await Offering.deleteOne({_id:req.params.id},{session});
    });res.json({message:'Offering deleted'});
};
