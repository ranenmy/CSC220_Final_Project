const insertMissing = require("./insertMissing");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");
const Record = require("../models/Record");

const seedRecords = async () => {
    try {
        await connectDB();
        console.log("Seeding student records...");

        const students = await User.find({ role: "student" });
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

            // Ayla 1
            { studentId: "2300123456", courseCode: "ENG101", grade: "B", term: "2023-3" },
            { studentId: "2300123456", courseCode: "ITE420", grade: "A", term: "2024-3" },
            { studentId: "2300123456", courseCode: "SOC221", grade: "W", term: "2023-3" },
            { studentId: "2300123456", courseCode: "ITE102", grade: "D+", term: "2025-1" },
            { studentId: "2300123456", courseCode: "BSC224", grade: "B", term: "2025-3" },
            { studentId: "2300123456", courseCode: "CSC368", grade: "A", term: "2025-3" },
            { studentId: "2300123456", courseCode: "THA101", grade: "IN PROGRESS", term: "2026-1" },
            { studentId: "2300123456", courseCode: "ITE231", grade: "A", term: "2/2025" },
            { studentId: "2300123456", courseCode: "CSC220", grade: "IN PROGRESS", term: "1/2026" },
            { studentId: "2300123456", courseCode: "ITE254", grade: "A", term: "1/2025" },

            // Nikolai 2
            { studentId: "2400456789", courseCode: "ITE441", grade: "F", term: "2/2024" },
            { studentId: "2400456789", courseCode: "PSY101", grade: "B", term: "1/2024" },
            { studentId: "2400456789", courseCode: "ITE240", grade: "B+", term: "3/2023" },
            { studentId: "2400456789", courseCode: "STA101", grade: "A", term: "2/2024" },
            { studentId: "2400456789", courseCode: "ITE102", grade: "C+", term: "3/2025" },
            { studentId: "2400456789", courseCode: "ITE343", grade: "A", term: "2/2025" },
            { studentId: "2400456789", courseCode: "ENG103", grade: "C+", term: "1/2024" },
            { studentId: "2400456789", courseCode: "ITE475", grade: "A", term: "3/2024" },
            { studentId: "2400456789", courseCode: "ITE365", grade: "A", term: "2/2025" },
            { studentId: "2400456789", courseCode: "CSC220", grade: "IN PROGRESS", term: "1/2026" },

            // Ronaldo 3
            { studentId: "2600345678", courseCode: "MIS103", grade: "B", term: "2/2024" },
            { studentId: "2600345678", courseCode: "ITE254", grade: "A", term: "3/2024" },
            { studentId: "2600345678", courseCode: "ITE331", grade: "A", term: "1/2024" },
            { studentId: "2600345678", courseCode: "PSY101", grade: "A", term: "1/2024" },
            { studentId: "2600345678", courseCode: "MAT101", grade: "B+", term: "2/2024" },
            { studentId: "2600345678", courseCode: "ITE479", grade: "B", term: "3/2024" },
            { studentId: "2600345678", courseCode: "BSC102", grade: "D+", term: "1/2025" },
            { studentId: "2600345678", courseCode: "CSC441", grade: "A", term: "1/2025" },
            { studentId: "2600345678", courseCode: "CSC222", grade: "A", term: "2/2025" },
            { studentId: "2600345678", courseCode: "CSC240", grade: "C", term: "3/2025" },

            // Captan 4
            { studentId: "2300567891", courseCode: "ITE104", grade: "A", term: "2/2025" },
            { studentId: "2300567891", courseCode: "ITE479", grade: "A", term: "2/2023" },
            { studentId: "2300567891", courseCode: "PSY101", grade: "A", term: "1/2023" },
            { studentId: "2300567891", courseCode: "ITE231", grade: "B+", term: "2/2023" },
            { studentId: "2300567891", courseCode: "ITE240", grade: "B", term: "3/2023" },
            { studentId: "2300567891", courseCode: "ITE475", grade: "B", term: "3/2023" },
            { studentId: "2300567891", courseCode: "ITE120", grade: "A", term: "1/2024" },
            { studentId: "2300567891", courseCode: "ITE221", grade: "B+", term: "2/2024" },
            { studentId: "2300567891", courseCode: "ITE222", grade: "A", term: "3/2024" },
            { studentId: "2300567891", courseCode: "ITE365", grade: "A", term: "2/2025" },

            // Bobby 5
            { studentId: "2400345678", courseCode: "ENG103", grade: "B", term: "3/2024" },
            { studentId: "2400345678", courseCode: "ITE222", grade: "A", term: "3/2024" },
            { studentId: "2400345678", courseCode: "ITE120", grade: "A", term: "1/2025" },
            { studentId: "2400345678", courseCode: "ITE104", grade: "A", term: "2/2024" },
            { studentId: "2400345678", courseCode: "GEO101", grade: "B", term: "1/2023" },
            { studentId: "2400345678", courseCode: "ITE224", grade: "A", term: "3/2025" },
            { studentId: "2400345678", courseCode: "ITE368", grade: "A", term: "3/2025" },
            { studentId: "2400345678", courseCode: "ITE343", grade: "A", term: "2/2025" },
            { studentId: "2400345678", courseCode: "ITE475", grade: "B", term: "3/2023" },
            { studentId: "2400345678", courseCode: "MAT102", grade: "A", term: "1/2024" },

            // Cucumber 6
            { studentId: "2300678901", courseCode: "ENG102", grade: "A", term: "2/2023" },
            { studentId: "2300678901", courseCode: "ITE210", grade: "C", term: "2/2024" },
            { studentId: "2300678901", courseCode: "MIS103", grade: "F", term: "2/2023" },
            { studentId: "2300678901", courseCode: "PYS202", grade: "B+", term: "2/2023" },
            { studentId: "2300678901", courseCode: "ENG103", grade: "B", term: "3/2023" },
            { studentId: "2300678901", courseCode: "ITE254", grade: "B+", term: "3/2023" },
            { studentId: "2300678901", courseCode: "ITE479", grade: "A", term: "3/2023" },
            { studentId: "2300678901", courseCode: "MAT101", grade: "A", term: "3/2023" },
            { studentId: "2300678901", courseCode: "ITE331", grade: "A", term: "1/2024" },
            { studentId: "2300678901", courseCode: "STA101", grade: "A", term: "1/2024" },

            // Demon 7
            { studentId: "2500234567", courseCode: "ENG102", grade: "A", term: "3/2023" },
            { studentId: "2500234567", courseCode: "ITE420", grade: "F", term: "3/2024" },
            { studentId: "2500234567", courseCode: "ITE120", grade: "A", term: "1/2024" },
            { studentId: "2500234567", courseCode: "ITE104", grade: "A", term: "1/2024" },
            { studentId: "2500234567", courseCode: "ENG103", grade: "A", term: "2/2024" },
            { studentId: "2500234567", courseCode: "ITE479", grade: "A", term: "3/2024" },
            { studentId: "2500234567", courseCode: "BSC102", grade: "B", term: "3/2024" },
            { studentId: "2500234567", courseCode: "ITE221", grade: "A", term: "3/2024" },
            { studentId: "2500234567", courseCode: "ITE222", grade: "A", term: "1/2025" },
            { studentId: "2500234567", courseCode: "ITE475", grade: "A", term: "2/2025" },

            // Kappaboy 8
            { studentId: "2300567890", courseCode: "MAT102", grade: "A", term: "2/2024" },
            { studentId: "2300567890", courseCode: "ENG101", grade: "D+", term: "1/2024" },
            { studentId: "2300567890", courseCode: "ITE222", grade: "A", term: "2/2025" },
            { studentId: "2300567890", courseCode: "ITE104", grade: "B+", term: "2/2025" },
            { studentId: "2300567890", courseCode: "ITE224", grade: "A", term: "3/2025" },
            { studentId: "2300567890", courseCode: "ITE102", grade: "C+", term: "3/2025" },
            { studentId: "2300567890", courseCode: "ITE254", grade: "B", term: "3/2025" },
            { studentId: "2300567890", courseCode: "ITE368", grade: "A", term: "3/2025" },
            { studentId: "2300567890", courseCode: "ITE420", grade: "A", term: "2/2025" },
            { studentId: "2300567890", courseCode: "ITE442", grade: "A", term: "2/2025" },

            // Zane 9
            { studentId: "2400234567", courseCode: "ITE479", grade: "A", term: "3/2023" },
            { studentId: "2400234567", courseCode: "ITE120", grade: "A", term: "1/2024" },
            { studentId: "2400234567", courseCode: "HIS101", grade: "B+", term: "2/2023" },
            { studentId: "2400234567", courseCode: "ITE221", grade: "A", term: "2/2024" },
            { studentId: "2400234567", courseCode: "ITE240", grade: "A", term: "3/2024" },
            { studentId: "2400234567", courseCode: "ITE475", grade: "A", term: "3/2024" },
            { studentId: "2400234567", courseCode: "ITE222", grade: "A", term: "3/2024" },
            { studentId: "2400234567", courseCode: "ITE224", grade: "A", term: "1/2025" },
            { studentId: "2400234567", courseCode: "ITE231", grade: "A", term: "2/2025" },
            { studentId: "2400234567", courseCode: "ITE451", grade: "A", term: "3/2025" },

            // Alex 10
            { studentId: "2300890123", courseCode: "ITE101", grade: "A", term: "3/2025" },
            { studentId: "2300890123", courseCode: "ITE451", grade: "A", term: "3/2025" },
            { studentId: "2300890123", courseCode: "ITE353", grade: "A", term: "2/2025" },
            { studentId: "2300890123", courseCode: "ITE321", grade: "A", term: "1/2025" },
            { studentId: "2300890123", courseCode: "ITE104", grade: "A", term: "2/2025" },
            { studentId: "2300890123", courseCode: "ITE254", grade: "A", term: "3/2023" },
            { studentId: "2300890123", courseCode: "ITE420", grade: "F", term: "1/2024" },
            { studentId: "2300890123", courseCode: "ITE201", grade: "A", term: "2/2024" },
            { studentId: "2300890123", courseCode: "ITE221", grade: "A", term: "2/2024" },
            { studentId: "2300890123", courseCode: "ITE442", grade: "A", term: "2/2024" },

            // Bay 11
            { studentId: "2400567890", courseCode: "ITE201", grade: "B", term: "2/2023" },
            { studentId: "2400567890", courseCode: "ITE451", grade: "B+", term: "3/2024" },
            { studentId: "2400567890", courseCode: "ITE331", grade: "A", term: "3/2025" },
            { studentId: "2400567890", courseCode: "ITE343", grade: "A", term: "2/2025" },
            { studentId: "2400567890", courseCode: "ITE104", grade: "A", term: "2/2025" },
            { studentId: "2400567890", courseCode: "ITE421", grade: "B+", term: "1/2025" },
            { studentId: "2400567890", courseCode: "ITE233", grade: "A", term: "1/2025" },
            { studentId: "2400567890", courseCode: "ITE222", grade: "A", term: "3/2024" },
            { studentId: "2400567890", courseCode: "ITE442", grade: "B+", term: "3/2024" },
            { studentId: "2400567890", courseCode: "ITE101", grade: "A", term: "2/2024" },

            // Elysia 12
            { studentId: "2400678901", courseCode: "MIS103", grade: "A", term: "3/2024" },
            { studentId: "2400678901", courseCode: "ENG102", grade: "A", term: "3/2024" },
            { studentId: "2400678901", courseCode: "BSC102", grade: "A", term: "3/2025" },
            { studentId: "2400678901", courseCode: "BSC120", grade: "A", term: "3/2025" },
            { studentId: "2400678901", courseCode: "BSC254", grade: "A", term: "3/2025" },
            { studentId: "2400678901", courseCode: "STA101", grade: "A", term: "3/2025" },
            { studentId: "2400678901", courseCode: "ITE101", grade: "A", term: "1/2025" },
            { studentId: "2400678901", courseCode: "BSC321", grade: "IN PROGRESS", term: "1/2026" },
            { studentId: "2400678901", courseCode: "ENG103", grade: "IN PROGRESS", term: "1/2026" },
            { studentId: "2400678901", courseCode: "CSC220", grade: "IN PROGRESS", term: "1/2026" },

            // Maxim 13
            { studentId: "2600234567", courseCode: "ITE476", grade: "B", term: "3/2025" },
            { studentId: "2600234567", courseCode: "ITE233", grade: "A", term: "2/2025" },
            { studentId: "2600234567", courseCode: "ITE441", grade: "C", term: "1/2025" },
            { studentId: "2600234567", courseCode: "ITE442", grade: "B+", term: "3/2024" },
            { studentId: "2600234567", courseCode: "ITE221", grade: "A", term: "3/2024" },
            { studentId: "2600234567", courseCode: "ITE222", grade: "A", term: "3/2025" },
            { studentId: "2600234567", courseCode: "ITE254", grade: "B", term: "2/2025" },
            { studentId: "2600234567", courseCode: "ITE477", grade: "B+", term: "2/2025" },
            { studentId: "2600234567", courseCode: "ECO200", grade: "B", term: "2/2025" },
            { studentId: "2600234567", courseCode: "ITE104", grade: "B", term: "2/2005" },

            // Elara 14
            { studentId: "2500123456", courseCode: "ITE441", grade: "A", term: "2/2024" },
            { studentId: "2500123456", courseCode: "ENG103", grade: "B", term: "2/2024" },
            { studentId: "2500123456", courseCode: "ITE442", grade: "A", term: "3/2024" },
            { studentId: "2500123456", courseCode: "ENG103", grade: "B+", term: "3/2024" },
            { studentId: "2500123456", courseCode: "ITE120", grade: "A", term: "1/2025" },
            { studentId: "2500123456", courseCode: "ITE221", grade: "A", term: "1/2025" },
            { studentId: "2500123456", courseCode: "CCSC222", grade: "A", term: "2/2025" },
            { studentId: "2500123456", courseCode: "BSC479", grade: "A", term: "2/2025" },
            { studentId: "2500123456", courseCode: "CSC353", grade: "A", term: "2/2025" },
            { studentId: "2500123456", courseCode: "CSC368", grade: "A", term: "3/2025" },

            // Peter 15
            { studentId: "2500345678", courseCode: "ENG103", grade: "A", term: "2/2024" },
            { studentId: "2500345678", courseCode: "ITE120", grade: "A", term: "2/2024" },
            { studentId: "2500345678", courseCode: "ITE441", grade: "A", term: "1/2025" },
            { studentId: "2500345678", courseCode: "PSY202", grade: "B+", term: "2/2025" },
            { studentId: "2500345678", courseCode: "ITE221", grade: "A", term: "3/2024" },
            { studentId: "2500345678", courseCode: "ITE222", grade: "A", term: "1/2025" },
            { studentId: "2500345678", courseCode: "ITE368", grade: "A", term: "3/2024" },
            { studentId: "2500345678", courseCode: "ITE343", grade: "F", term: "2/2025" },
            { studentId: "2500345678", courseCode: "MAT102", grade: "B+", term: "1/2025" },
            { studentId: "2500345678", courseCode: "SRA101", grade: "B+", term: "3/2025" },

            // Bernardo 16
            { studentId: "2500567890", courseCode: "ITE220", grade: "A", term: "2/2025" },
            { studentId: "2500567890", courseCode: "ENG103", grade: "A", term: "2/2025" },
            { studentId: "2500567890", courseCode: "ITE222", grade: "A", term: "1/2025" },
            { studentId: "2500567890", courseCode: "GEO101", grade: "A", term: "1/2025" },
            { studentId: "2500567890", courseCode: "ITE421", grade: "B", term: "3/2025" },
            { studentId: "2500567890", courseCode: "ITE442", grade: "A", term: "3/2025" },
            { studentId: "2500567890", courseCode: "ITE420", grade: "A", term: "3/2025" },
            { studentId: "2500567890", courseCode: "ITE368", grade: "A", term: "1/2026" },
            { studentId: "2500567890", courseCode: "ITE475", grade: "A", term: "3/2025" },
            { studentId: "2500567890", courseCode: "ITE365", grade: "A", term: "1/2026" },

            // Zinn 17
            { studentId: "2600456789", courseCode: "ITE475", grade: "A", term: "1/2023" },
            { studentId: "2600456789", courseCode: "ITE220", grade: "B", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE321", grade: "B", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE104", grade: "B", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE420", grade: "A", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE442", grade: "A", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE368", grade: "B", term: "3/2024" },
            { studentId: "2600456789", courseCode: "MAT101", grade: "A", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE222", grade: "A", term: "3/2024" },
            { studentId: "2600456789", courseCode: "ITE365", grade: "B", term: "3/2024" },

            // Liam 18
            { studentId: "2600789012", courseCode: "ENG101", grade: "B", term: "3/2024" },
            { studentId: "2600789012", courseCode: "ITE420", grade: "A", term: "1/2025" },
            { studentId: "2600789012", courseCode: "BSC224", grade: "B+", term: "2/2025" },
            { studentId: "2600789012", courseCode: "THA101", grade: "A", term: "3/2025" },
            { studentId: "2600789012", courseCode: "CSC220", grade: "B", term: "1/2026" },
            { studentId: "2600789012", courseCode: "ITE254", grade: "A-", term: "2/2025" },
            { studentId: "2600789012", courseCode: "ITE240", grade: "F", term: "3/2024" },
            { studentId: "2600789012", courseCode: "ITE451", grade: "B+", term: "3/2025" },
            { studentId: "2600789012", courseCode: "MAT101", grade: "A", term: "1/2024" },
            { studentId: "2600789012", courseCode: "ITE/BSC104", grade: "B", term: "2/2024" },

            // Noah 19
            { studentId: "2600890123", courseCode: "ENG101", grade: "A", term: "1/2024" },
            { studentId: "2600890123", courseCode: "ITE420", grade: "B+", term: "2/2024" },
            { studentId: "2600890123", courseCode: "BSC224", grade: "A", term: "3/2024" },
            { studentId: "2600890123", courseCode: "THA101", grade: "B", term: "1/2025" },
            { studentId: "2600890123", courseCode: "CSC220", grade: "A", term: "2/2025" },
            { studentId: "2600890123", courseCode: "ITE254", grade: "B+", term: "3/2025" },
            { studentId: "2600890123", courseCode: "ITE240", grade: "B", term: "1/2025" },
            { studentId: "2600890123", courseCode: "ITE451", grade: "A", term: "3/2025" },
            { studentId: "2600890123", courseCode: "MAT101", grade: "F", term: "2/2024" },
            { studentId: "2600890123", courseCode: "ITE/BSC104", grade: "B+", term: "3/2024" },

            // Oliver 20
            { studentId: "2500678901", courseCode: "ENG101", grade: "B+", term: "2/2024" },
            { studentId: "2500678901", courseCode: "ITE420", grade: "F", term: "3/2024" },
            { studentId: "2500678901", courseCode: "BSC224", grade: "B", term: "1/2025" },
            { studentId: "2500678901", courseCode: "THA101", grade: "A", term: "2/2025" },
            { studentId: "2500678901", courseCode: "CSC220", grade: "B+", term: "3/2025" },
            { studentId: "2500678901", courseCode: "ITE254", grade: "A", term: "1/2025" },
            { studentId: "2500678901", courseCode: "ITE240", grade: "B", term: "2/2025" },
            { studentId: "2500678901", courseCode: "ITE451", grade: "B", term: "3/2025" },
            { studentId: "2500678901", courseCode: "MAT101", grade: "B+", term: "1/2024" },
            { studentId: "2500678901", courseCode: "ITE/BSC104", grade: "A", term: "2/2024" },

            // Ethan 21
            { studentId: "2500789012", courseCode: "ENG101", grade: "A", term: "3/2023" },
            { studentId: "2500789012", courseCode: "ITE420", grade: "B", term: "1/2024" },
            { studentId: "2500789012", courseCode: "BSC224", grade: "A-", term: "2/2024" },
            { studentId: "2500789012", courseCode: "THA101", grade: "B+", term: "3/2024" },
            { studentId: "2500789012", courseCode: "CSC220", grade: "A", term: "1/2025" },
            { studentId: "2500789012", courseCode: "ITE254", grade: "F", term: "2/2025" },
            { studentId: "2500789012", courseCode: "ITE240", grade: "C", term: "3/2024" },
            { studentId: "2500789012", courseCode: "ITE451", grade: "A", term: "3/2025" },
            { studentId: "2500789012", courseCode: "MAT101", grade: "B+", term: "1/2024" },
            { studentId: "2500789012", courseCode: "ITE/BSC104", grade: "A", term: "2/2024" },

            // Lucas 22
            { studentId: "2400789012", courseCode: "ENG101", grade: "B", term: "1/2023" },
            { studentId: "2400789012", courseCode: "ITE420", grade: "A", term: "2/2023" },
            { studentId: "2400789012", courseCode: "BSC224", grade: "B+", term: "3/2024" },
            { studentId: "2400789012", courseCode: "THA101", grade: "A", term: "1/2025" },
            { studentId: "2400789012", courseCode: "CSC220", grade: "F", term: "2/2025" },
            { studentId: "2400789012", courseCode: "ITE254", grade: "B", term: "3/2025" },
            { studentId: "2400789012", courseCode: "ITE240", grade: "A", term: "2/2024" },
            { studentId: "2400789012", courseCode: "ITE451", grade: "B+", term: "3/2025" },
            { studentId: "2400789012", courseCode: "MAT101", grade: "A", term: "1/2024" },
            { studentId: "2400789012", courseCode: "ITE/BSC104", grade: "B", term: "3/2024" },

            // James 23
            { studentId: "2500890123", courseCode: "ENG101", grade: "A", term: "2/2024" },
            { studentId: "2500890123", courseCode: "ITE420", grade: "F", term: "3/2024" },
            { studentId: "2500890123", courseCode: "BSC224", grade: "B", term: "1/2025" },
            { studentId: "2500890123", courseCode: "THA101", grade: "B+", term: "2/2025" },
            { studentId: "2500890123", courseCode: "CSC220", grade: "A", term: "3/2025" },
            { studentId: "2500890123", courseCode: "ITE254", grade: "A", term: "1/2025" },
            { studentId: "2500890123", courseCode: "ITE240", grade: "B", term: "2/2024" },
            { studentId: "2500890123", courseCode: "ITE451", grade: "A-", term: "3/2025" },
            { studentId: "2500890123", courseCode: "MAT101", grade: "B+", term: "1/2024" },
            { studentId: "2500890123", courseCode: "ITE/BSC104", grade: "A", term: "2/2024" },

            // Henry 24
            { studentId: "2400890123", courseCode: "ENG101", grade: "C+", term: "3/2023" },
            { studentId: "2400890123", courseCode: "ITE420", grade: "B", term: "1/2024" },
            { studentId: "2400890123", courseCode: "BSC224", grade: "A", term: "2/2024" },
            { studentId: "2400890123", courseCode: "THA101", grade: "B+", term: "3/2024" },
            { studentId: "2400890123", courseCode: "CSC220", grade: "B", term: "1/2025" },
            { studentId: "2400890123", courseCode: "ITE254", grade: "A", term: "2/2025" },
            { studentId: "2400890123", courseCode: "ITE240", grade: "F", term: "3/2024" },
            { studentId: "2400890123", courseCode: "ITE451", grade: "A", term: "3/2025" },
            { studentId: "2400890123", courseCode: "MAT101", grade: "B", term: "1/2024" },
            { studentId: "2400890123", courseCode: "ITE/BSC104", grade: "A", term: "2/2024" },

            // Daniel 25
            { studentId: "2600901234", courseCode: "ENG101", grade: "B+", term: "1/2024" },
            { studentId: "2600901234", courseCode: "ITE420", grade: "A", term: "2/2024" },
            { studentId: "2600901234", courseCode: "BSC224", grade: "A", term: "3/2024" },
            { studentId: "2600901234", courseCode: "THA101", grade: "B", term: "1/2025" },
            { studentId: "2600901234", courseCode: "CSC220", grade: "A", term: "2/2025" },
            { studentId: "2600901234", courseCode: "ITE254", grade: "B+", term: "3/2025" },
            { studentId: "2600901234", courseCode: "ITE240", grade: "A", term: "1/2025" },
            { studentId: "2600901234", courseCode: "ITE451", grade: "F", term: "3/2025" },
            { studentId: "2600901234", courseCode: "MAT101", grade: "A", term: "2/2024" },
            { studentId: "2600901234", courseCode: "ITE/BSC104", grade: "B+", term: "3/2024" }
        ];

        const finalRecords = records
            .filter(record =>
                studentMap[record.studentId] &&
                courseMap[record.courseCode] &&
                record.grade !== "IN PROGRESS"
            )
            .map(record => ({
                studentId: studentMap[record.studentId],
                courseId: courseMap[record.courseCode],
                term: record.term,
                grade: record.grade
            }));

        console.log(`Total completed records: ${finalRecords.length}`);

        await insertMissing(
            Record,
            finalRecords,
            ["studentId", "courseId", "term"]
        );

        console.log(
            `${finalRecords.length} student records processed successfully`
        );

        process.exit();

    } catch (error) {
        console.error("Seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedRecords();