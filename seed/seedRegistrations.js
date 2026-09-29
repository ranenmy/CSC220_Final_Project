const insertMissing = require("./insertMissing");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");
const Offering = require("../models/Offering");
const Registration = require("../models/Registration");

const seedRegistrations = async () => {
    try {
        await connectDB();
        console.log("Seeding registrations...");

        const students = await User.find({role: "student"});
        const courses = await Course.find();
        const offerings = await Offering.find({ term: "2026-1" });

        const studentMap = {};
        const courseMap = {};
        const offeringMap = {};

        students.forEach(student => {
            studentMap[student.studentId] = student._id
        });

        courses.forEach(course => {
            courseMap[course.code] = course._id;
        });

        offerings.forEach(offering => {
            const course = courses.find(
                course => course._id.toString() === offering.courseId.toString()
            );

            if (course) {
                const key = `${course.code}-${offering.section}`;
                offeringMap[key] = offering._id;
            }
        });

        const registrations = [
            {"studentID":"2300123456","courseCode":"THA101","section":1},
            {"studentID":"2300123456","courseCode":"CSC220","section":1},
            {"studentID":"2300123456","courseCode":"ITE/BSC104","section":1},
            {"studentID":"2400456789","courseCode":"CSC220","section":2},
            {"studentID":"2400456789","courseCode":"ITE/CSC441","section":1},
            {"studentID":"2400456789","courseCode":"ENG101","section":1},
            {"studentID":"2600345678","courseCode":"CSC220","section":1},
            {"studentID":"2600345678","courseCode":"ITE420","section":1},
            {"studentID":"2600345678","courseCode":"THA101","section":2},
            {"studentID":"2300567891","courseCode":"CSC220","section":1},
            {"studentID":"2300567891","courseCode":"ITE254","section":1},
            {"studentID":"2300567891","courseCode":"BSC224","section":1},
            {"studentID":"2400345678","courseCode":"CSC220","section":3},
            {"studentID":"2400345678","courseCode":"THA101","section":2},
            {"studentID":"2400345678","courseCode":"BSC224","section":1},
            {"studentID":"2300678901","courseCode":"MIS103","section":1},
            {"studentID":"2300678901","courseCode":"CSC220","section":3},
            {"studentID":"2300678901","courseCode":"BSC224","section":1},
            {"studentID":"2500234567","courseCode":"ITE420","section":1},
            {"studentID":"2500234567","courseCode":"CSC220","section":1},
            {"studentID":"2500234567","courseCode":"THA101","section":2},
            {"studentID":"2300567890","courseCode":"CSC220","section":1},
            {"studentID":"2300567890","courseCode":"BSC224","section":1},
            {"studentID":"2300567890","courseCode":"THA101","section":2},
            {"studentID":"2400234567","courseCode":"CSC220","section":1},
            {"studentID":"2400234567","courseCode":"ITE254","section":1},
            {"studentID":"2400234567","courseCode":"BSC224","section":1},
            {"studentID":"2300890123","courseCode":"ITE420","section":1},
            {"studentID":"2300890123","courseCode":"CSC220","section":1},
            {"studentID":"2300890123","courseCode":"BSC224","section":1},
            {"studentID":"2400567890","courseCode":"CSC220","section":1},
            {"studentID":"2400567890","courseCode":"BSC224","section":1},
            {"studentID":"2400567890","courseCode":"THA101","section":2},
            {"studentID":"2400678901","courseCode":"CSC220","section":3},
            {"studentID":"2400678901","courseCode":"THA101","section":2},
            {"studentID":"2400678901","courseCode":"ITE254","section":1},
            {"studentID":"2600234567","courseCode":"CSC220","section":1},
            {"studentID":"2600234567","courseCode":"BSC224","section":1},
            {"studentID":"2600234567","courseCode":"THA101","section":2},
            {"studentID":"2500123456","courseCode":"CSC220","section":1},
            {"studentID":"2500123456","courseCode":"ITE254","section":1},
            {"studentID":"2500123456","courseCode":"BSC224","section":1},
            {"studentID":"2500345678","courseCode":"ITE343","section":1},
            {"studentID":"2500345678","courseCode":"CSC220","section":1},
            {"studentID":"2500345678","courseCode":"BSC224","section":1}
        ];

        const finalRegistrations = registrations 
        .map(registration => {
            const studentId = studentMap[registration.studentID];
            const offeringId = offeringMap[`${registration.courseCode}-${registration.section}`];

            if (!studentId || !offeringId) {
                throw new Error(`Missing student or offering: ${registration.studentID}/${registration.courseCode}/section ${registration.section}`);
            }

            return {
                studentId, 
                offeringId,
                term: "2026-1",
                status: "registered"
            };
        })
        .filter(registration => registration !== null);

        await insertMissing(Registration, finalRegistrations, ["studentId", "offeringId", "term"]);
        console.log(`${finalRegistrations.length} registration added successfully`);
        process.exit();

    } catch (error) {
        console.error("Registration seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedRegistrations();