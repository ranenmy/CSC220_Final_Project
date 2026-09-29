const Registration=require('../models/Registration');
const Offering=require('../models/Offering');
const Record=require('../models/Record');
const rules=require('../services/eligibilityService');
const {body,id,term,fail,write}=require('../services/api');
exports.createRegistration=async(req,res)=>{
    const input=body(req.body,['studentId','offeringId']);id(input.studentId);id(input.offeringId);
    const result=await write(async session=>{
        const student=await rules.student(input.studentId,session);
        const offering=await Offering.findById(input.offeringId).session(session);if(!offering)fail(404,'Offering not found');
        const reasons=await rules.reasons(student,offering,session);if(reasons.length)fail(409,reasons.join('; '));
        let registration=await Registration.findOne({...input,term:offering.term,status:'dropped'}).session(session);
        if(!registration)registration=new Registration({...input,term:offering.term,status:'registered'});
        registration.status='registered';await registration.save({session});
        const filter={studentId:student._id,courseId:offering.courseId,term:offering.term};
        const records=await Record.find(filter).session(session);
        if(records.length>1)fail(409,'Duplicate academic records need repair before registration');
        if(records.length){records[0].grade='IN PROGRESS';await records[0].save({session});}
        else await new Record({...filter,grade:'IN PROGRESS'}).save({session});
        offering.seatsTaken=await Registration.countDocuments({offeringId:offering._id,status:'registered'}).session(session);await offering.save({session});
        return registration;
    });res.status(201).json(result);
};
exports.deleteRegistration=async(req,res)=>{
    id(req.params.id);const result=await write(async session=>{
        const r=await Registration.findById(req.params.id).session(session);if(!r)fail(404,'Registration not found');
        if(r.status==='dropped')return r;
        const o=await Offering.findById(r.offeringId).session(session);if(!o)fail(409,'Referenced offering is missing');
        if(!o.addDropOpen)fail(409,'Add/drop is closed');
        const filter={studentId:r.studentId,courseId:o.courseId,term:r.term};
        const records=await Record.find(filter).session(session);
        if(records.some(x=>!['IN PROGRESS','W'].includes(x.grade)))fail(409,'Cannot drop a course with a completed grade');
        r.status='dropped';await r.save({session});
        await Record.updateMany({...filter,grade:'IN PROGRESS'},{$set:{grade:'W'}},{session});
        o.seatsTaken=await Registration.countDocuments({offeringId:o._id,status:'registered'}).session(session);await o.save({session});return r;
    });res.json(result);
};
exports.getMyRegistrations=async(req,res)=>{
    const filter={studentId:req.user._id,status:'registered'};if(req.query.term!==undefined)filter.term=term(req.query.term);
    res.json(await Registration.find(filter).populate({path:'offeringId',populate:{path:'courseId'}}));
};
