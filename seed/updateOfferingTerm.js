require("dotenv").config();

const mongoose = require("mongoose");
const Offering = require("../models/Offering");

const updateTerm = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const result = await Offering.updateMany(
            { term: "2026-1" },
            { $set: { term: "1-2026" } }
        );

        console.log(result);

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

updateTerm();