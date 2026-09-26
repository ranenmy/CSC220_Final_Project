const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "advisor", "student"],
        required: true
    },

    studentId: {
        type: String,
        unique: true,
        sparse: true
    },

    advisorId: {
        type: String,
        unique: true,
        sparse: true
    },

    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("User", userSchema);