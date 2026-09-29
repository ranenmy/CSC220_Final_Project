require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const User = require("..//models/User");

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
                name: "Ayla",
                email: "ayla@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300123456",
                active: true
            },

            {
                name: "Nikolai",
                email: "niko@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400456789",
                active: true
            },

            {
                name: "Ronaldo",
                email: "ronaldo@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600345678",
                active: true
            },

            {
                name: "Captan",
                email: "captan@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300567891",
                active: true
            },

            {
                name: "Bobby",
                email: "bobB@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400345678",
                active: true
            },

            {
                name: "Cucumber",
                email: "cucu@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300678901",
                active: true
            },

            {
                name: "Demon",
                email: "demon@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500234567",
                active: true
            },

            {
                name: "Kappaboy",
                email: "kappy@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300567890",
                active: true
            },

            {
                name: "Zane",
                email: "zane@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400234567",
                active: true
            },

            {
                name: "Alex",
                email: "alex@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2300890123",
                active: true
            },

            {
                name: "Bay",
                email: "bay@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400567890",
                active: true
            },

            {
                name: "Elysia",
                email: "Elysia@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2400678901",
                active: true
            },

            {
                name: "Maxim",
                email: "irf@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2600234567",
                active: true
            },

            {
                name: "Elara",
                email: "elara@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500123456",
                active: true
            },

            {
                name: "Peter",
                email: "peter@gmail.com",
                passwordHash,
                role: "student",
                studentId: "2500345678",
                active: true
            }

        ];

        const students = users.filter(user => user.role === "student");

        await User.insertMany(students);

        console.log("student added successfully");
        process.exit();
    } catch (error) {
        console.error("Seeding failed");
        console.error(error);
        process.exit(1);
    }
};

seedUsers();