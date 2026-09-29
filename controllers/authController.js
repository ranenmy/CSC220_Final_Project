const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || typeof password !== "string" ||
        !email.trim() || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    // Match current seed emails exactly; some contain uppercase letters.
    const user = await User.findOne({ email: email.trim() });
    if (!user || !user.active || typeof user.passwordHash !== "string" ||
        !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({}, process.env.JWT_SECRET, {
        subject: user._id.toString(),
        algorithm: "HS256",
        expiresIn: "1h"
    });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};
