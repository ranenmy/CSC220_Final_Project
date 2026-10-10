require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const User = require("../models/User");

const seedUsers = async () => {
    try {
        await connectDB();

        console.log("Seeding users...");

        const passwordHash = await bcrypt.hash("Password123!", 10);

        const users = [
            { // admin ###############################################
                name: "Lanka", 
                email: "lanka@gmail.com",
                passwordHash,
                role: "admin",
            
                active: true
            },

            { // advisor ###############################################
                name: "WendyLuu",
                email: "wendylu@gmail.com",
                passwordHash,
                role: "advisor",
                advisorId: "AD001",
                active: true
            },

            {
                name: "Zak",
                email: "zak@gmail.com",
                passwordHash,
                role: "advisor",
                advisorId: "AD002",
                active: true
            },
            
            {
                name: "Shuvra",
                email: "shuvra@gmail.com",
                passwordHash,
                role: "advisor",
                advisorId: "AD003",
                active: true
            },

            {
                name: "Nay",
                email: "Nay@gmail.com",
                passwordHash,
                role: "advisor",
                advisorId: "AD004",
                active: true
            },

            { // students ###############################################
                name: "Ayla", //1
                email: "ayla@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300123456",
                active: true
            },

            {
                name: "Nikolai", //2
                email: "niko@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400456789",
                active: true
            },

            {
                name: "Ronaldo", //3
                email: "ronaldo@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600345678",
                active: true
            },

            {
                name: "Captan", //4
                email: "captan@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300567891",
                active: true
            },

            {
                name: "Bobby", //5
                email: "bobB@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400345678",
                active: true
            },

            {
                name: "Cucumber", //6
                email: "cucu@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300678901",
                active: true
            },

            {
                name: "Demon", //7
                email: "demon@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500234567",
                active: true
            },

            {
                name: "Kappaboy", //8
                email: "kappy@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300567890",
                active: true
            },

            {
                name: "Zane", //9
                email: "zane@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400234567",
                active: true
            },

            {
                name: "Alex", //10
                email: "alex@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300890123",
                active: true
            },

            {
                name: "Bay", //11
                email: "bay@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400567890",
                active: true
            },

            {
                name: "Elysia", //12
                email: "Elysia@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400678901",
                active: true
            },

            {
                name: "Maxim", //13
                email: "irf@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600234567",
                active: true
            },

            {
                name: "Elara", //14
                email: "elara@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500123456",
                active: true
            },

            {
                name: "Peter", //15
                email: "peter@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500345678",
                active: true
            },

            {
                name: "Bernardo", //16
                email: "bernardo@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500567890",
                active: true
            },

            {
                name: "Zinn", //17
                email: "zinn@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600456789",
                active: true
            },

            {
                name: "Liam", //18
                email: "liam@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600789012",
                active: true
            },

            {
                name: "Noah", //19
                email: "noah@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600890123",
                active: true
            },
            
            {
                name: "Oliver", //20
                email: "oliver@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500678901",
                active: true
            },

            {
                name: "Ethan", //21
                email: "ethan@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500789012",
                active: true
            },

            {
                name: "Lucas", //22
                email: "Lucas@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400789012",
                active: true
            },

            {
                name: "James", //23
                email: "james@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500890123",
                active: true
            },

            {
                name: "Henry", //24
                email: "henry@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400890123",
                active: true
            },

            {
                name: "David", //25
                email: "david@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2700901234",
                active: true
            }
        ];

        await User.insertMany(users);

        console.log("Users added successfully");
        process.exit();
    } catch (error) {
        console.error("Seeding failed");
        console.error(error);
        process.exit(1);
    }
};

seedUsers();