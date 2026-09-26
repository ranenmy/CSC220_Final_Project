require("dotenv").config();

const connectDB =require("../config/db")
const User = require("../models/User");
const Course = require("../models/Course");
const Record = require("../models/Record");

const seedRecords =async () => {
    try {
        await connectDB();
        console.log("Seeding student records...");

        const students = await User.find({ role: "student"});
        const courses = await Course.find();

        const studentMap = {};
        const courseMap = {};

        students.forEach(student => {
            studentMap[student.studentId] = student._id;
        });

        courses.forEach(course => {
            courseMap[course.code] = course._id;
        });

        const records = [
            // Ayla - 2300123456
            { studentID: "2300123456", courseCode: "ENG101", grade: "B", term: "2023-3" },
            { studentID: "2300123456", courseCode: "ITE420", grade: "A", term: "2024-3" },
            { studentID: "2300123456", courseCode: "SOC221", grade: "W", term: "2023-3" },
            { studentID: "2300123456", courseCode: "BSC224", grade: "B", term: "2025-3" },
            { studentID: "2300123456", courseCode: "CSC368", grade: "A", term: "2025-3" },
            { studentID: "2300123456", courseCode: "THA101", grade: "IN PROGRESS", term: "2026-1" },
            { studentID: "2300123456", courseCode: "ITE231", grade: "A", term: "2025-2" },
            { studentID: "2300123456", courseCode: "CSC220", grade: "IN PROGRESS", term: "2026-1" },
            { studentID: "2300123456", courseCode: "ITE254", grade: "A", term: "2025-1" },

            // Nikolai - 2400456789
            { studentID: "2400456789", courseCode: "ITE/CSC441", grade: "F", term: "2024-2" },
            { studentID: "2400456789", courseCode: "PSY101", grade: "B", term: "2024-1" },
            { studentID: "2400456789", courseCode: "ITE240", grade: "B+", term: "2023-3" },
            { studentID: "2400456789", courseCode: "BSC224", grade: "C+", term: "2025-3" },
            { studentID: "2400456789", courseCode: "CSC220", grade: "IN PROGRESS", term: "2026-1" },

            // Ronaldo - 2600345678
            { studentID: "2600345678", courseCode: "MIS103", grade: "B", term: "2024-2" },
            { studentID: "2600345678", courseCode: "ITE254", grade: "A", term: "2024-3" },
            { studentID: "2600345678", courseCode: "ITE331", grade: "A", term: "2024-1" },
            { studentID: "2600345678", courseCode: "PSY101", grade: "A", term: "2024-1" },
            { studentID: "2600345678", courseCode: "MAT101", grade: "B+", term: "2024-2" },
            { studentID: "2600345678", courseCode: "BSC224", grade: "C", term: "2025-3" },

            // Captan - 2300567891
            { studentID: "2300567891", courseCode: "ITE231", grade: "B+", term: "2023-2" },
            { studentID: "2300567891", courseCode: "ITE240", grade: "B", term: "2023-3" },
            { studentID: "2300567891", courseCode: "PSY101", grade: "A", term: "2023-1" },
            { studentID: "2300567891", courseCode: "ITE451", grade: "A", term: "2025-2" },
            { studentID: "2300567891", courseCode: "CSC368", grade: "A", term: "2025-3" },

            // Bobby - 2400345678
            { studentID: "2400345678", courseCode: "PSY101", grade: "B", term: "2024-3" },
            { studentID: "2400345678", courseCode: "ITE254", grade: "A", term: "2025-3" },
            { studentID: "2400345678", courseCode: "ITE451", grade: "B", term: "2025-3" },
            { studentID: "2400345678", courseCode: "MAT101", grade: "A", term: "2024-1" },
            { studentID: "2400345678", courseCode: "CSC220", grade: "IN PROGRESS", term: "2026-1" },

            // Cucumber - 2300678901
            { studentID: "2300678901", courseCode: "MIS103", grade: "F", term: "2023-2" },
            { studentID: "2300678901", courseCode: "ITE254", grade: "B+", term: "2023-3" },
            { studentID: "2300678901", courseCode: "ITE331", grade: "A", term: "2024-1" },
            { studentID: "2300678901", courseCode: "MAT101", grade: "A", term: "2023-3" },
            { studentID: "2300678901", courseCode: "ENG101", grade: "A", term: "2023-2" },

            // Demon - 2500234567
            { studentID: "2500234567", courseCode: "ITE420", grade: "F", term: "2024-3" },
            { studentID: "2500234567", courseCode: "ITE240", grade: "A", term: "2024-1" },
            { studentID: "2500234567", courseCode: "ITE231", grade: "A", term: "2024-2" },
            { studentID: "2500234567", courseCode: "BSC224", grade: "B", term: "2024-3" },
            { studentID: "2500234567", courseCode: "ITE451", grade: "A", term: "2025-2" },

            // Kappaboy - 2300567890
            { studentID: "2300567890", courseCode: "MAT101", grade: "A", term: "2024-2" },
            { studentID: "2300567890", courseCode: "ENG101", grade: "D+", term: "2024-1" },
            { studentID: "2300567890", courseCode: "ITE254", grade: "B", term: "2025-3" },
            { studentID: "2300567890", courseCode: "ITE420", grade: "A", term: "2025-2" },
            { studentID: "2300567890", courseCode: "CSC368", grade: "A", term: "2025-3" },

            // Zane - 2400234567
            { studentID: "2400234567", courseCode: "ITE240", grade: "A", term: "2024-3" },
            { studentID: "2400234567", courseCode: "ITE231", grade: "A", term: "2025-2" },
            { studentID: "2400234567", courseCode: "ITE451", grade: "A", term: "2025-3" },
            { studentID: "2400234567", courseCode: "ITE222", grade: "A", term: "2024-3" },

            // Alex - 2300890123
            { studentID: "2300890123", courseCode: "ITE420", grade: "F", term: "2024-1" },
            { studentID: "2300890123", courseCode: "ITE254", grade: "A", term: "2023-3" },
            { studentID: "2300890123", courseCode: "ITE451", grade: "A", term: "2025-3" },
            { studentID: "2300890123", courseCode: "CSC368", grade: "A", term: "2025-3" },

            // Bay - 2400567890
            { studentID: "2400567890", courseCode: "ITE451", grade: "B+", term: "2024-3" },
            { studentID: "2400567890", courseCode: "ITE331", grade: "A", term: "2025-3" },
            { studentID: "2400567890", courseCode: "ITE254", grade: "A", term: "2025-3" },
            { studentID: "2400567890", courseCode: "ITE420", grade: "B", term: "2025-2" },

            // Elysia - 2400678901
            { studentID: "2400678901", courseCode: "MIS103", grade: "A", term: "2024-3" },
            { studentID: "2400678901", courseCode: "BSC224", grade: "A", term: "2025-3" },
            { studentID: "2400678901", courseCode: "BSC224", grade: "IN PROGRESS", term: "2026-1" },
            { studentID: "2400678901", courseCode: "CSC220", grade: "IN PROGRESS", term: "2026-1" },

            // Maxim - 2600234567
            { studentID: "2600234567", courseCode: "ITE254", grade: "B", term: "2025-2" },
            { studentID: "2600234567", courseCode: "ITE451", grade: "B", term: "2025-3" },
            { studentID: "2600234567", courseCode: "ITE231", grade: "A", term: "2025-2" },
            { studentID: "2600234567", courseCode: "ITE/BSC104", grade: "B", term: "2025-2" },

            // Elara - 2500123456
            { studentID: "2500123456", courseCode: "ITE451", grade: "A", term: "2024-2" },
            { studentID: "2500123456", courseCode: "CSC368", grade: "A", term: "2025-3" },
            { studentID: "2500123456", courseCode: "ITE240", grade: "A", term: "2025-1" },
            { studentID: "2500123456", courseCode: "ITE231", grade: "A", term: "2025-1" },

            // Peter - 2500345678
            { studentID: "2500345678", courseCode: "PSY101", grade: "B+", term: "2025-2" },
            { studentID: "2500345678", courseCode: "ITE343", grade: "F", term: "2025-2" },
            { studentID: "2500345678", courseCode: "MAT101", grade: "B+", term: "2025-1" },
            { studentID: "2500345678", courseCode: "CSC368", grade: "A", term: "2025-3" }
        ];

        const finalRecords = records
        .filter(record =>
            studentMap[record.studentID] &&
            courseMap[record.courseCode]
        )
        .map(record => ({
            studentId: studentMap[record.studentID],
            courseId: courseMap[record.courseCode],
            term: record.term,
            grade: record.grade
        }));

        await Record.insertMany(finalRecords);

        console.log(`1${finalRecords.length} student recorded added successfully`);
        process.exit();
    } catch (error) {
        console.error("record seedning failed:");
        console.error(error);
        process.exit(1);
    }
};

seedRecords();
