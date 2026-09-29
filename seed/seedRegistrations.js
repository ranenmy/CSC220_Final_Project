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

        const students = await User.find({ role: "student" });
        const courses = await Course.find();

        // Use the same term as seedOfferings.js
        const offerings = await Offering.find({ term: "1-2026" });

        const studentMap = {};
        const courseMap = {};
        const offeringMap = {};

        students.forEach(student => {
            studentMap[student.studentId] = student._id;
        });

        courses.forEach(course => {
            courseMap[course.code] = course._id;
        });

        offerings.forEach(offering => {
            const course = courses.find(
                course =>
                    course._id.toString() === offering.courseId.toString()
            );

            if (course) {
                const key = `${course.code}-${offering.section}`;
                offeringMap[key] = offering._id;
            }
        });

        const registrations = [
            // Ayla 1
            { studentId: "2300123456", courseCode: "THA101", section: 1 },
            { studentId: "2300123456", courseCode: "CSC220", section: 1 },
            { studentId: "2300123456", courseCode: "ITE254", section: 1 },

            // Nikolai 2
            { studentId: "2400456789", courseCode: "CSC220", section: 2 },
            { studentId: "2400456789", courseCode: "ITE420", section: 3 },
            { studentId: "2400456789", courseCode: "ITE240", section: 1 },

            // Ronaldo 3
            { studentId: "2600345678", courseCode: "ITE254", section: 2 },
            { studentId: "2600345678", courseCode: "BSC224", section: 1 },
            { studentId: "2600345678", courseCode: "ITE451", section: 1 },

            // Captan 4
            { studentId: "2300567891", courseCode: "ITE451", section: 1 },
            { studentId: "2300567891", courseCode: "CSC220", section: 4 },
            { studentId: "2300567891", courseCode: "ITE240", section: 1 },

            // Bobby 5
            { studentId: "2400345678", courseCode: "CSC220", section: 3 },
            { studentId: "2400345678", courseCode: "ITE254", section: 1 },
            { studentId: "2400345678", courseCode: "ITE451", section: 2 },

            // Cucumber 6
            { studentId: "2300678901", courseCode: "BSC224", section: 2 },
            { studentId: "2300678901", courseCode: "ITE254", section: 2 },
            { studentId: "2300678901", courseCode: "ENG101", section: 1 },

            // Demon 7
            { studentId: "2500234567", courseCode: "ITE420", section: 1 },
            { studentId: "2500234567", courseCode: "ITE451", section: 3 },
            { studentId: "2500234567", courseCode: "THA101", section: 4 },

            // Kappaboy 8
            { studentId: "2300567890", courseCode: "ENG101", section: 1 },
            { studentId: "2300567890", courseCode: "ITE254", section: 2 },
            { studentId: "2300567890", courseCode: "ITE420", section: 2 },

            // Zane 9
            { studentId: "2400234567", courseCode: "ITE240", section: 1 },
            { studentId: "2400234567", courseCode: "ITE451", section: 1 },
            { studentId: "2400234567", courseCode: "THA101", section: 3 },

            // Alex 10
            { studentId: "2300890123", courseCode: "ITE420", section: 1 },
            { studentId: "2300890123", courseCode: "ITE254", section: 1 },
            { studentId: "2300890123", courseCode: "CSC220", section: 3 },

            // Bay 11
            { studentId: "2400567890", courseCode: "ITE451", section: 2 },
            { studentId: "2400567890", courseCode: "BSC224", section: 3 },
            { studentId: "2400567890", courseCode: "ITE254", section: 1 },

            // Elysia 12
            { studentId: "2400678901", courseCode: "CSC220", section: 3 },
            { studentId: "2400678901", courseCode: "THA101", section: 2 },
            { studentId: "2400678901", courseCode: "BSC224", section: 1 },

            // Maxim 13
            { studentId: "2600234567", courseCode: "ITE254", section: 1 },
            { studentId: "2600234567", courseCode: "ITE451", section: 1 },
            { studentId: "2600234567", courseCode: "ITE420", section: 3 },

            // Elara 14
            { studentId: "2500123456", courseCode: "CSC220", section: 3 },
            { studentId: "2500123456", courseCode: "ITE240", section: 1 },
            { studentId: "2500123456", courseCode: "ITE451", section: 2 },

            // Peter 15
            { studentId: "2500345678", courseCode: "CSC220", section: 1 },
            { studentId: "2500345678", courseCode: "BSC224", section: 1 },
            { studentId: "2500345678", courseCode: "THA101", section: 1 },

            // Bernardo 16
            { studentId: "2500567890", courseCode: "ITE420", section: 1 },
            { studentId: "2500567890", courseCode: "ITE451", section: 2 },
            { studentId: "2500567890", courseCode: "CSC220", section: 2 },

            // Zinn 17
            { studentId: "2600456789", courseCode: "ITE420", section: 2 },
            { studentId: "2600456789", courseCode: "ITE254", section: 1 },
            { studentId: "2600456789", courseCode: "ITE451", section: 3 },

            // Liam 18
            { studentId: "2600789012", courseCode: "ENG101", section: 1 },
            { studentId: "2600789012", courseCode: "CSC220", section: 1 },
            { studentId: "2600789012", courseCode: "ITE254", section: 1 },

            // Noah 19
            { studentId: "2600890123", courseCode: "ITE420", section: 2 },
            { studentId: "2600890123", courseCode: "BSC224", section: 1 },
            { studentId: "2600890123", courseCode: "CSC220", section: 2 },

            // Oliver 20
            { studentId: "2500678901", courseCode: "ITE420", section: 1 },
            { studentId: "2500678901", courseCode: "THA101", section: 1 },
            { studentId: "2500678901", courseCode: "ITE451", section: 1 },

            // Ethan 21
            { studentId: "2500789012", courseCode: "CSC220", section: 3 },
            { studentId: "2500789012", courseCode: "ITE254", section: 2 },
            { studentId: "2500789012", courseCode: "BSC224", section: 2 },

            // Lucas 22
            { studentId: "2400789012", courseCode: "ENG101", section: 2 },
            { studentId: "2400789012", courseCode: "ITE240", section: 1 },
            { studentId: "2400789012", courseCode: "ITE451", section: 2 },

            // James 23
            { studentId: "2500890123", courseCode: "ITE420", section: 3 },
            { studentId: "2500890123", courseCode: "CSC220", section: 1 },
            { studentId: "2500890123", courseCode: "ITE254", section: 1 },

            // Henry 24
            { studentId: "2400890123", courseCode: "BSC224", section: 3 },
            { studentId: "2400890123", courseCode: "THA101", section: 2 },
            { studentId: "2400890123", courseCode: "ITE240", section: 1 },

            // Daniel 25
            { studentId: "2600901234", courseCode: "ITE451", section: 3 },
            { studentId: "2600901234", courseCode: "CSC220", section: 3 },
            { studentId: "2600901234", courseCode: "ITE254", section: 2 }
        ];

        const finalRegistrations = registrations.map(registration => {
            const studentId = studentMap[registration.studentId];
            const offeringId =
                offeringMap[
                    `${registration.courseCode}-${registration.section}`
                ];

            if (!studentId || !offeringId) {
                throw new Error(
                    `Missing student or offering: ${registration.studentId}/${registration.courseCode}/section ${registration.section}`
                );
            }

            return {
                studentId,
                offeringId,
                term: "1-2026",
                status: "registered"
            };
        });

        await insertMissing(
            Registration,
            finalRegistrations,
            ["studentId", "offeringId", "term"]
        );

        console.log(
            `${finalRegistrations.length} registrations added successfully`
        );

        process.exit();

    } catch (error) {
        console.error("Registration seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedRegistrations();