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
            { //1
                courseCode: "ENG101",
                term: "1-2026",
                section: 1,
                day: "Monday",
                startTime: "09:00",
                endTime: "11:00",
                room: "1201",
                instructor: "Ryan",
                seats: 30,
                seatsTaken: 18,
                addDropOpen: true
            },

            { //2
                courseCode: "ENG101",
                term: "1-2026",
                section: 2,
                day: "Tuesday",
                startTime: "13:00",
                endTime: "15:00",
                room: "1202",
                instructor: "Ryan",
                seats: 30,
                seatsTaken: 12,
                addDropOpen: true
            },

            { //3
                courseCode: "ENG101",
                term: "1-2026",
                section: 3,
                day: "Wednesday",
                startTime: "09:00",
                endTime: "11:00",
                room: "1301",
                instructor: "Ryan",
                seats: 25,
                seatsTaken: 15,
                addDropOpen: true
            },

            { //4
                courseCode: "ENG101",
                term: "1-2026",
                section: 4,
                day: "Thursday",
                startTime: "15:00",
                endTime: "17:00",
                room: "1401",
                instructor: "Ryan",
                seats: 30,
                seatsTaken: 20,
                addDropOpen: true
            },

            { //5
                courseCode: "ITE420",
                term: "1-2026",
                section: 1,
                day: "Monday",
                startTime: "13:00",
                endTime: "15:00",
                room: "2201",
                instructor: "Zak",
                seats: 25,
                seatsTaken: 20,
                addDropOpen: true
            },

            { //6
                courseCode: "ITE420",
                term: "1-2026",
                section: 2,
                day: "Wednesday",
                startTime: "13:00",
                endTime: "15:00",
                room: "2202",
                instructor: "Nay",
                seats: 30,
                seatsTaken: 17,
                addDropOpen: true
            },

            { //7
                courseCode: "ITE420",
                term: "1-2026",
                section: 3,
                day: "Friday",
                startTime: "09:00",
                endTime: "11:00",
                room: "2301",
                instructor: "Shuvra",
                seats: 25,
                seatsTaken: 10,
                addDropOpen: true
            },

            { //8
                courseCode: "BSC224",
                term: "1-2026",
                section: 1,
                day: "Tuesday",
                startTime: "09:00",
                endTime: "11:00",
                room: "2302",
                instructor: "Zak",
                seats: 25,
                seatsTaken: 19,
                addDropOpen: true
            },

            { //9
                courseCode: "BSC224",
                term: "1-2026",
                section: 2,
                day: "Wednesday",
                startTime: "15:00",
                endTime: "17:00",
                room: "2303",
                instructor: "Nay",
                seats: 25,
                seatsTaken: 14,
                addDropOpen: true
            },

            { //10
                courseCode: "BSC224",
                term: "1-2026",
                section: 3,
                day: "Thursday",
                startTime: "09:00",
                endTime: "11:00",
                room: "2401",
                instructor: "Shuvra",
                seats: 30,
                seatsTaken: 21,
                addDropOpen: true
            },

            { //11
                courseCode: "BSC224",
                term: "1-2026",
                section: 4,
                day: "Friday",
                startTime: "13:00",
                endTime: "15:00",
                room: "2402",
                instructor: "Zak",
                seats: 30,
                seatsTaken: 25,
                addDropOpen: false
            },

            { //12
                courseCode: "THA101",
                term: "1-2026",
                section: 1,
                day: "Monday",
                startTime: "11:00",
                endTime: "13:00",
                room: "2403",
                instructor: "Kim",
                seats: 30,
                seatsTaken: 14,
                addDropOpen: true
            },

            { //13
                courseCode: "THA101",
                term: "1-2026",
                section: 2,
                day: "Tuesday",
                startTime: "15:00",
                endTime: "17:00",
                room: "2501",
                instructor: "Kim",
                seats: 30,
                seatsTaken: 11,
                addDropOpen: true
            },

            { //14
                courseCode: "THA101",
                term: "1-2026",
                section: 3,
                day: "Thursday",
                startTime: "09:00",
                endTime: "11:00",
                room: "2502",
                instructor: "Kim",
                seats: 25,
                seatsTaken: 18,
                addDropOpen: true
            },

            { //15
                courseCode: "THA101",
                term: "1-2026",
                section: 4,
                day: "Friday",
                startTime: "10:00",
                endTime: "12:00",
                room: "2503",
                instructor: "Kim",
                seats: 25,
                seatsTaken: 25,
                addDropOpen: false
            },

            { //16
                courseCode: "CSC220",
                term: "1-2026",
                section: 1,
                day: "Monday",
                startTime: "09:00",
                endTime: "11:00",
                room: "2504",
                instructor: "Wendy",
                seats: 30,
                seatsTaken: 18,
                addDropOpen: true
            },

            { //17
                courseCode: "CSC220",
                term: "1-2026",
                section: 2,
                day: "Tuesday",
                startTime: "10:00",
                endTime: "12:00",
                room: "2505",
                instructor: "Wendy",
                seats: 25,
                seatsTaken: 16,
                addDropOpen: true
            },

            { //18
                courseCode: "CSC220",
                term: "1-2026",
                section: 3,
                day: "Wednesday",
                startTime: "13:00",
                endTime: "15:00",
                room: "2506",
                instructor: "Wendy",
                seats: 30,
                seatsTaken: 22,
                addDropOpen: true
            },

            { //19
                courseCode: "CSC220",
                term: "1-2026",
                section: 4,
                day: "Thursday",
                startTime: "10:00",
                endTime: "12:00",
                room: "2507",
                instructor: "Wendy",
                seats: 25,
                seatsTaken: 25,
                addDropOpen: false
            },

            { //20
                courseCode: "ITE254",
                term: "1-2026",
                section: 1,
                day: "Monday",
                startTime: "15:00",
                endTime: "17:00",
                room: "2203",
                instructor: "Nay",
                seats: 30,
                seatsTaken: 16,
                addDropOpen: true
            },

            { //21
                courseCode: "ITE254",
                term: "1-2026",
                section: 2,
                day: "Tuesday",
                startTime: "13:00",
                endTime: "15:00",
                room: "2304",
                instructor: "Shuvra",
                seats: 25,
                seatsTaken: 20,
                addDropOpen: true
            },

            { //22
                courseCode: "ITE240",
                term: "1-2026",
                section: 1,
                day: "Monday",
                startTime: "10:00",
                endTime: "12:00",
                room: "2404",
                instructor: "Zak",
                seats: 25,
                seatsTaken: 25,
                addDropOpen: false
            },

            { //23
                courseCode: "ITE/BSC104",
                term: "1-2026",
                section: 1,
                day: "Wednesday",
                startTime: "09:00",
                endTime: "11:00",
                room: "2405",
                instructor: "Nay",
                seats: 30,
                seatsTaken: 14,
                addDropOpen: true
            },

            { //24
                courseCode: "ITE451",
                term: "1-2026",
                section: 1,
                day: "Thursday",
                startTime: "10:00",
                endTime: "12:00",
                room: "2204",
                instructor: "Shuvra",
                seats: 30,
                seatsTaken: 20,
                addDropOpen: true
            },

            { //25
                courseCode: "ITE451",
                term: "1-2026",
                section: 2,
                day: "Friday",
                startTime: "13:00",
                endTime: "15:00",
                room: "2305",
                instructor: "Zak",
                seats: 25,
                seatsTaken: 8,
                addDropOpen: true
            },

            { //26
                courseCode: "ITE451",
                term: "1-2026",
                section: 3,
                day: "Friday",
                startTime: "15:00",
                endTime: "17:00",
                room: "2507",
                instructor: "Nay",
                seats: 30,
                seatsTaken: 12,
                addDropOpen: true
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

        await Offering.insertMany(finalOfferings);
        console.log("26 offerings added successfully");
        process.exit();
    } catch (error) {
        console.error("Offering seeding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedOffering();