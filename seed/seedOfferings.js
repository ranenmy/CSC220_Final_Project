const insertMissing = require("./insertMissing");
require("dotenv").config();

const connectDB = require("../config/db");
const Course = require("../models/Course");
const Offering = require("../models/Offering");

const seedOffering = async () => {
    try {
        await connectDB();
        console.log("Seeding offerings...");

        const courses = await Course.find();
        const courseMap = {};

        courses.forEach(course => {
            courseMap[course.code] = course._id;
        });

        const offerings = [
            
            {//1
                courseCode: "ENG101",
                term: "2026-1",
                section: 1,
                day: "Monday",
                startTime: "10:30",
                endTime: "12:30",
                room: "1201",
                instructor: "Dr. Ryan",
                seats: 30
            },
            {//2
                courseCode: "ENG101",
                term: "2026-1",
                section: 2,
                day: "Tuesday",
                startTime: "12:30",
                endTime: "14:30",
                room: "1202",
                instructor: "Dr. AB",
                seats: 30
            },
            {//3
                courseCode: "ENG101",
                term: "2026-1",
                section: 3,
                day: "Wednesday",
                startTime: "10:30",
                endTime: "12:30",
                room: "1301",
                instructor: "Dr. Sarah",
                seats: 25
            },
            {//4
                courseCode: "ENG101",
                term: "2026-1",
                section: 4,
                day: "Thursday",
                startTime: "14:30",
                endTime: "16:30",
                room: "1401",
                instructor: "Dr. AB",
                seats: 30
            },
            {//5
                courseCode: "ITE420",
                term: "2026-1",
                section: 1,
                day: "Monday",
                startTime: "08:30",
                endTime: "10:30",
                room: "2201",
                instructor: "Dr. Zak",
                seats: 25
            },
            {//6
                courseCode: "ITE420",
                term: "2026-1",
                section: 2,
                day: "Wednesday",
                startTime: "12:30",
                endTime: "14:30",
                room: "2202",
                instructor: "Dr. Nay",
                seats: 30
            },
            {//7
                courseCode: "ITE420",
                term: "2026-1",
                section: 3,
                day: "Friday",
                startTime: "10:30",
                endTime: "12:30",
                room: "2301",
                instructor: "Dr. Shuvra",
                seats: 25
            },
            {//8
                courseCode: "BSC224",
                term: "2026-1",
                section: 1,
                day: "Tuesday",
                startTime: "08:30",
                endTime: "10:30",
                room: "2302",
                instructor: "Dr. Zak",
                seats: 25
            },
            {//9
                courseCode: "BSC224",
                term: "2026-1",
                section: 2,
                day: "Wednesday",
                startTime: "14:30",
                endTime: "16:30",
                room: "2303",
                instructor: "Dr.Nay",
                seats: 25
            },
            {//10
                courseCode: "BSC224",
                term: "2026-1",
                section: 3,
                day: "Thursday",
                startTime: "10:30",
                endTime: "12:30",
                room: "2401",
                instructor: "Dr. Shuvra",
                seats: 30
            },
            {//11
                courseCode: "BSC224",
                term: "2026-1",
                section: 4,
                day: "Friday",
                startTime: "12:30",
                endTime: "14:30",
                room: "2402",
                instructor: "Dr.Zak",
                seats: 30
            },
            {//12
                courseCode: "THA101",
                term: "2026-1",
                section: 1,
                day: "Monday",
                startTime: "12:30",
                endTime: "14:30",
                room: "2403",
                instructor: "Dr. Kin",
                seats: 30
            },
            {//13
                courseCode: "THA101",
                term: "2026-1",
                section: 2,
                day: "Tuesday",
                startTime: "14:30",
                endTime: "16:30",
                room: "2501",
                instructor: "Dr. Kin",
                seats: 30
            },
            {//14
                courseCode: "THA101",
                term: "2026-1",
                section: 3,
                day: "Thursday",
                startTime: "10:30",
                endTime: "12:30",
                room: "2502",
                instructor: "Dr. Kin",
                seats: 25
            },
            {//15
                courseCode: "THA101",
                term: "2026-1",
                section: 4,
                day: "Friday",
                startTime: "14:30",
                endTime: "16:30",
                room: "2503",
                instructor: "Dr. Kin",
                seats: 25
            },
            {//16
                courseCode: "CSC220",
                term: "2026-1",
                section: 1,
                day: "Monday",
                startTime: "08:30",
                endTime: "10:30",
                room: "2504",
                instructor: "Dr. Wendy",
                seats: 30
            },
            {//17
                courseCode: "CSC220",
                term: "2026-1",
                section: 2,
                day: "Tuesday",
                startTime: "12:30",
                endTime: "14:30",
                room: "2505",
                instructor: "Dr. Wendy",
                seats: 25
            },
            {//18
                courseCode: "CSC220",
                term: "2026-1",
                section: 3,
                day: "Wednesday",
                startTime: "14:30",
                endTime: "16:30",
                room: "2506",
                instructor: "Dr. Wendy",
                seats: 30
            },
            {//19
                courseCode: "CSC220",
                term: "2026-1",
                section: 4,
                day: "Thursday",
                startTime: "10:30",
                endTime: "12:20",
                room: "2507",
                instructor: "Dr. Wendy",
                seats: 25
            },
            {//20
                courseCode: "ITE254",
                term: "2026-1",
                section: 1,
                day: "Monday",
                startTime: "14:30",
                endTime: "16:30",
                room: "2203",
                instructor: "Dr. Nay",
                seats: 30
            },
            {//21
                courseCode: "ITE254",
                term: "2026-1",
                section: 2,
                day: "Tuesday",
                startTime: "12:30",
                endTime: "14:30",
                room: "2304",
                instructor: "Dr. Shuvra",
                seats: 25
            },
            {//22
                courseCode: "ITE240",
                term: "2026-1",
                section: 1,
                day: "Monday",
                startTime: "10:30",
                endTime: "12:30",
                room: "2404",
                instructor: "Dr. Zak",
                seats: 25
            },
            {//23
                courseCode: "ITE/BSC104",
                term: "2026-1",
                section: 1,
                day: "Wednesday",
                startTime: "08:30",
                endTime: "12:30",
                room: "2405",
                instructor: "Dr. Nay",
                seats: 30
            },
            {//24
                courseCode: "ITE451",
                term: "2026-1",
                section: 1,
                day: "Thursday",
                startTime: "10:30",
                endTime: "12:30",
                room: "2204",
                instructor: "Dr. Shuvra",
                seats: 30
            },
            {//25
                courseCode: "ITE451",
                term: "2026-1",
                section: 2,
                day: "Friday",
                startTime: "12:30",
                endTime: "14:30",
                room: "2305",
                instructor: "Dr. Zak",
                seats: 25
            },
            {//26
                courseCode: "ITE451",
                term: "2026-1",
                section: 3,
                day: "Friday",
                startTime: "14:30",
                endTime: "16:30",
                room: "2507",
                instructor: "Dr. Nay",
                seats: 30
            }
        ];

        const finalOfferings = offerings.map(offering => ({
            courseId: courseMap[offering.courseCode],
            term: offering.term,
            section: offering.section,
            day: offering.day,
            startTime: offering.startTime,
            endTime: offering.endTime,
            room: offering.room,
            instructor: offering.instructor,
            seats: offering.seats,
            seatsTaken: 0,
            addDropOpen: true
        }));

        await insertMissing(
            Offering,
            finalOfferings,
            ["courseId", "term", "section"]
        );

        console.log(`${finalOfferings.length} offerings processed successfully`);
        process.exit();

    } catch (error) {
        console.error("Offering seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedOffering();