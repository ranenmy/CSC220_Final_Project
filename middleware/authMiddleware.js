const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
    const header = req.get("Authorization") || "";
    const match = header.match(/^Bearer (\S+)$/);
    if (!match) return res.status(401).json({ message: "Login required" });

    let payload;
    try {
        payload = jwt.verify(match[1], process.env.JWT_SECRET, {
            algorithms: ["HS256"]
        });
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    if (!payload || typeof payload.sub !== "string" ||
        !mongoose.isObjectIdOrHexString(payload.sub)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(payload.sub).select("-passwordHash");
    if (!user || !user.active) {
        return res.status(401).json({ message: "Account unavailable" });
    }
    req.user = user;
    next();
};

exports.allowRoles = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Login required" });
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "You do not have permission" });
    }
    next();
};