const insertMissing = require("./insertMissing");
require("dotenv").config();

const connectDB =require("../config/db")
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
            {
                "courseCode": "ENG101",
                "term": "2026-1",
                "section": 1,
                "day": "Monday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "1201",
                "instructor": "Ryan",
                "seats": 30,
                "seatsTaken": 1,
                "addDropOpen": true
            },
            {
                "courseCode": "ENG101",
                "term": "2026-1",
                "section": 2,
                "day": "Tuesday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "1202",
                "instructor": "Ryan",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ENG101",
                "term": "2026-1",
                "section": 3,
                "day": "Wednesday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "1301",
                "instructor": "Ryan",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ENG101",
                "term": "2026-1",
                "section": 4,
                "day": "Thursday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "1401",
                "instructor": "Ryan",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE420",
                "term": "2026-1",
                "section": 1,
                "day": "Monday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "2201",
                "instructor": "Zak",
                "seats": 25,
                "seatsTaken": 3,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE420",
                "term": "2026-1",
                "section": 2,
                "day": "Wednesday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "2202",
                "instructor": "Nay",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE420",
                "term": "2026-1",
                "section": 3,
                "day": "Friday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "2301",
                "instructor": "Shuvra",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "BSC224",
                "term": "2026-1",
                "section": 1,
                "day": "Tuesday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "2302",
                "instructor": "Zak",
                "seats": 25,
                "seatsTaken": 10,
                "addDropOpen": true
            },
            {
                "courseCode": "BSC224",
                "term": "2026-1",
                "section": 2,
                "day": "Wednesday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "2303",
                "instructor": "Nay",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "BSC224",
                "term": "2026-1",
                "section": 3,
                "day": "Thursday",
                "startTime": "08:00",
                "endTime": "10:00",
                "room": "2401",
                "instructor": "Shuvra",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "BSC224",
                "term": "2026-1",
                "section": 4,
                "day": "Friday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "2402",
                "instructor": "Zak",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": false
            },
            {
                "courseCode": "THA101",
                "term": "2026-1",
                "section": 1,
                "day": "Monday",
                "startTime": "11:00",
                "endTime": "13:00",
                "room": "2403",
                "instructor": "Kim",
                "seats": 30,
                "seatsTaken": 1,
                "addDropOpen": true
            },
            {
                "courseCode": "THA101",
                "term": "2026-1",
                "section": 2,
                "day": "Tuesday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "2501",
                "instructor": "Kim",
                "seats": 30,
                "seatsTaken": 7,
                "addDropOpen": true
            },
            {
                "courseCode": "THA101",
                "term": "2026-1",
                "section": 3,
                "day": "Thursday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "2502",
                "instructor": "Kim",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "THA101",
                "term": "2026-1",
                "section": 4,
                "day": "Friday",
                "startTime": "10:00",
                "endTime": "12:00",
                "room": "2503",
                "instructor": "Kim",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": false
            },
            {
                "courseCode": "CSC220",
                "term": "2026-1",
                "section": 1,
                "day": "Monday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "2504",
                "instructor": "Wendy",
                "seats": 30,
                "seatsTaken": 11,
                "addDropOpen": true
            },
            {
                "courseCode": "CSC220",
                "term": "2026-1",
                "section": 2,
                "day": "Tuesday",
                "startTime": "10:00",
                "endTime": "12:00",
                "room": "2505",
                "instructor": "Wendy",
                "seats": 25,
                "seatsTaken": 1,
                "addDropOpen": true
            },
            {
                "courseCode": "CSC220",
                "term": "2026-1",
                "section": 3,
                "day": "Wednesday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "2506",
                "instructor": "Wendy",
                "seats": 30,
                "seatsTaken": 3,
                "addDropOpen": true
            },
            {
                "courseCode": "CSC220",
                "term": "2026-1",
                "section": 4,
                "day": "Thursday",
                "startTime": "10:00",
                "endTime": "12:00",
                "room": "2507",
                "instructor": "Wendy",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": false
            },
            {
                "courseCode": "ITE254",
                "term": "2026-1",
                "section": 1,
                "day": "Monday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "2203",
                "instructor": "Nay",
                "seats": 30,
                "seatsTaken": 4,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE254",
                "term": "2026-1",
                "section": 2,
                "day": "Tuesday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "2304",
                "instructor": "Shuvra",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE240",
                "term": "2026-1",
                "section": 1,
                "day": "Monday",
                "startTime": "10:00",
                "endTime": "12:00",
                "room": "2404",
                "instructor": "Zak",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": false
            },
            {
                "courseCode": "ITE/BSC104",
                "term": "2026-1",
                "section": 1,
                "day": "Wednesday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "2405",
                "instructor": "Nay",
                "seats": 30,
                "seatsTaken": 1,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE451",
                "term": "2026-1",
                "section": 1,
                "day": "Thursday",
                "startTime": "10:00",
                "endTime": "12:00",
                "room": "2204",
                "instructor": "Shuvra",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE451",
                "term": "2026-1",
                "section": 2,
                "day": "Friday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "2305",
                "instructor": "Zak",
                "seats": 25,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE451",
                "term": "2026-1",
                "section": 3,
                "day": "Friday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "2507",
                "instructor": "Nay",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "PSY101",
                "term": "2026-1",
                "section": 1,
                "day": "Friday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "1201",
                "instructor": "Myo",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "MIS103",
                "term": "2026-1",
                "section": 1,
                "day": "Wednesday",
                "startTime": "08:00",
                "endTime": "10:00",
                "room": "2404",
                "instructor": "Nye",
                "seats": 30,
                "seatsTaken": 1,
                "addDropOpen": true
            },
            {
                "courseCode": "MAT101",
                "term": "2026-1",
                "section": 1,
                "day": "Thursday",
                "startTime": "13:00",
                "endTime": "15:00",
                "room": "2602",
                "instructor": "Nye",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "CSC368",
                "term": "2026-1",
                "section": 1,
                "day": "Wednesday",
                "startTime": "11:00",
                "endTime": "13:00",
                "room": "2603",
                "instructor": "Nye",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE331",
                "term": "2026-1",
                "section": 1,
                "day": "Tuesday",
                "startTime": "15:00",
                "endTime": "17:00",
                "room": "2604",
                "instructor": "Maria",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE231",
                "term": "2026-1",
                "section": 1,
                "day": "Tuesday",
                "startTime": "09:00",
                "endTime": "11:00",
                "room": "2605",
                "instructor": "Nye",
                "seats": 30,
                "seatsTaken": 0,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE/CSC441",
                "day": "Thursday",
                "startTime": "13:00",
                "endTime": "15:00",
                "instructor": "Zak",
                "room": "2201",
                "term": "2026-1",
                "section": 1,
                "seats": 25,
                "seatsTaken": 1,
                "addDropOpen": true
            },
            {
                "courseCode": "ITE343",
                "day": "Wednesday",
                "startTime": "11:00",
                "endTime": "13:00",
                "instructor": "Wendy",
                "room": "2504",
                "term": "2026-1",
                "section": 1,
                "seats": 25,
                "seatsTaken": 1,
                "addDropOpen": true
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
            seatsTaken: offering.seatsTaken,
            addDropOpen: offering.addDropOpen
        }));

        await insertMissing(Offering, finalOfferings, ["courseId", "term", "section"]);
        console.log(`${finalOfferings.length} offerings processed successfully`);
        process.exit();
    } catch (error) {
        console.error("Offering seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedOffering();