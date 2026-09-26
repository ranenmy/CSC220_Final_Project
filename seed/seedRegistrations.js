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
        const offerings = await Offering.find({ term: "1-2026" });

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
            // Ayla
            { studentID: "2300123456", courseCode: "THA101", section: 1 },
            { studentID: "2300123456", courseCode: "CSC220", section: 1 },
            { studentID: "2300123456", courseCode: "ITE254", section: 1 },

            // Nikolai
            { studentID: "2400456789", courseCode: "CSC220", section: 2 },
            { studentID: "2400456789", courseCode: "PSY101", section: 1 },
            { studentID: "2400456789", courseCode: "ITE240", section: 1 },

            // Ronaldo
            { studentID: "2600345678", courseCode: "MIS103", section: 1 },
            { studentID: "2600345678", courseCode: "ITE254", section: 2 },
            { studentID: "2600345678", courseCode: "MAT101", section: 1 },

            // Captan
            { studentID: "2300567891", courseCode: "ITE451", section: 1 },
            { studentID: "2300567891", courseCode: "CSC368", section: 1 },
            { studentID: "2300567891", courseCode: "ITE240", section: 1 },

            // Bobby
            { studentID: "2400345678", courseCode: "CSC220", section: 3 },
            { studentID: "2400345678", courseCode: "ITE254", section: 1 },
            { studentID: "2400345678", courseCode: "ITE451", section: 2 },

            // Cucumber
            { studentID: "2300678901", courseCode: "MIS103", section: 1 },
            { studentID: "2300678901", courseCode: "ITE331", section: 1 },
            { studentID: "2300678901", courseCode: "MAT101", section: 1 },

            // Demon
            { studentID: "2500234567", courseCode: "ITE420", section: 1 },
            { studentID: "2500234567", courseCode: "ITE231", section: 1 },
            { studentID: "2500234567", courseCode: "ITE451", section: 3 },

            // Kappaboy
            { studentID: "2300567890", courseCode: "ENG101", section: 1 },
            { studentID: "2300567890", courseCode: "ITE254", section: 2 },
            { studentID: "2300567890", courseCode: "ITE420", section: 2 },

            // Zane
            { studentID: "2400234567", courseCode: "ITE240", section: 1 },
            { studentID: "2400234567", courseCode: "ITE231", section: 1 },
            { studentID: "2400234567", courseCode: "ITE451", section: 1 },

            // Alex
            { studentID: "2300890123", courseCode: "ITE420", section: 1 },
            { studentID: "2300890123", courseCode: "ITE254", section: 1 },
            { studentID: "2300890123", courseCode: "CSC368", section: 1 },

            // Bay
            { studentID: "2400567890", courseCode: "ITE451", section: 2 },
            { studentID: "2400567890", courseCode: "ITE331", section: 1 },
            { studentID: "2400567890", courseCode: "ITE254", section: 1 },

            // Elysia
            { studentID: "2400678901", courseCode: "CSC220", section: 3 },
            { studentID: "2400678901", courseCode: "THA101", section: 2 },
            { studentID: "2400678901", courseCode: "MIS103", section: 1 },

            // Maxim
            { studentID: "2600234567", courseCode: "ITE254", section: 1 },
            { studentID: "2600234567", courseCode: "ITE451", section: 1 },
            { studentID: "2600234567", courseCode: "ITE231", section: 1 },

            // Elara
            { studentID: "2500123456", courseCode: "CSC368", section: 1 },
            { studentID: "2500123456", courseCode: "ITE240", section: 1 },
            { studentID: "2500123456", courseCode: "ITE451", section: 2 },

            // Peter
            { studentID: "2500345678", courseCode: "CSC368", section: 1 },
            { studentID: "2500345678", courseCode: "MAT101", section: 1 },
            { studentID: "2500345678", courseCode: "PSY101", section: 1 }
        ];

        const finalRegistrations = registrations 
        .map(registration => {
            const studentId = studentMap[registration.studentID];
            const offeringId = offeringMap[`${registration.courseCode}-${registration.section}`];

            if (!studentId || !offeringId) {
                return null;
            }

            return {
                studentId, 
                offeringId,
                term: "1-2026",
                status: "registered"
            };
        })
        .filter(registration => registration !== null);

        await Registration.insertMany(finalRegistrations);
        console.log(`${finalRegistrations.length} registration added successfully`);
        process.exit();

    } catch (error) {
        console.error("Registration seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedRegistrations();