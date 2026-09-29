const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, id, fail, write } = require('../services/api');
const safe = user => { const data = user.toObject(); delete data.passwordHash; return data; };
const fields = ['name','email','password','role','studentId','advisorId','active'];
function validate(data) {
    for (const key of ['name','email','role']) if (typeof data[key] !== 'string' || !data[key].trim()) fail(400, `${key} is required`);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fail(400, 'Valid email is required');
    if (!['admin','advisor','student'].includes(data.role)) fail(400, 'Invalid role');
    if (typeof data.active !== 'boolean') fail(400, 'active must be a boolean');
    const key = data.role === 'student' ? 'studentId' : data.role === 'advisor' ? 'advisorId' : null;
    if (key && (typeof data[key] !== 'string' || !data[key].trim())) fail(400, `${key} is required`);
}
exports.getUsers = async (req,res) => res.json(await User.find().select('-passwordHash'));
exports.createUser = async (req,res) => {
    const input = body(req.body, fields);
    if (typeof input.password !== 'string' || input.password.length < 8) fail(400, 'Password must have at least 8 characters');
    const data = { ...input, active: input.active ?? true }; validate(data);
    delete data.password; data.passwordHash = await bcrypt.hash(input.password,10);
    const result = await write(async session => {
        if (await User.findOne({email:data.email}).collation({locale:'en',strength:2}).session(session)) fail(409,'Email already exists');
        const user = new User(data); await user.save({session}); return safe(user);
    });
    res.status(201).json(result);
};
exports.updateUser = async (req,res) => {
    id(req.params.id); const input = body(req.body, fields);
    if (input.password !== undefined && (typeof input.password !== 'string' || input.password.length < 8)) fail(400,'Password must have at least 8 characters');
    const hash = input.password === undefined ? undefined : await bcrypt.hash(input.password,10);
    const result = await write(async session => {
        const user = await User.findById(req.params.id).session(session); if (!user) fail(404,'User not found');
        if (input.role && input.role !== user.role) fail(409,'Role changes are not supported; create the appropriate account to preserve references');
        if (user.role === 'admin' && input.active === false && user.active && await User.countDocuments({role:'admin',active:true}).session(session) <= 1) fail(409,'Cannot deactivate the last active admin');
        if (input.email && await User.findOne({_id:{$ne:user._id},email:input.email}).collation({locale:'en',strength:2}).session(session)) fail(409,'Email already exists');
        for (const [key,value] of Object.entries(input)) if (key !== 'password') user[key]=value;
        if (hash) user.passwordHash=hash; validate(user); await user.save({session}); return safe(user);
    }); res.json(result);
};
exports.deleteUser = async (req,res) => {
    id(req.params.id);
    await write(async session => {
        const user=await User.findById(req.params.id).session(session); if(!user) fail(404,'User not found');
        if(user.role==='admin' && user.active && await User.countDocuments({role:'admin',active:true}).session(session)<=1) fail(409,'Cannot deactivate the last active admin');
        user.active=false; await user.save({session});
    }); res.json({message:'Account deactivated; records preserved'});
};
