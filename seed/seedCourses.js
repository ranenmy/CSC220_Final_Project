require("dotenv").config();

const connectDB = require("../config/db");
const Course = require("../models/Course");

const seedCourse = async () => {
    try {
        await connectDB();
        console.log("Seeding courses..");

        const courses = [
            { //1
                code: "ENG101",
                title: "Introduction to Academic Writing",
                credits: 4,
                description: "Develop academic writing, reading and communication skills."
            },

            { //2
                code: "ITE420",
                title: "Information Assurance and Security I",
                credits: 4,
                description: "Introduces Information security, risks, threats and protection method."
            },

            { //3
                code: "SOC221",
                title: "Business Culture and Current Issues in ASEAN",
                credits: 4,
                description: "Explores business culture and current issues in ASEAN cuntries."
            },

            { //4
                code: "ITE/BSC102",
                title: "Discete Mathematics Structure",
                credits: 4,
                description: "Covers mathematical concepts used in computer science and information technology."
            },

            { //5
                code: "BSC224",
                title: "Introduction to Data Science",
                credits: 4,
                description: "Introduces data science concepts, data analysis, and basic data processing."
            },

            { //6
                code: "CSC368",
                title: "Software Testing and Maintenance",
                credits: 4,
                description: "Covers software testing methods and techniques for maintaining software system."
            },

            { //7
                code: "THA101",
                title: "Elementary Thai I",
                credits: 4,
                description: "Introduces basic Thai language skills for everyday communication."
            },

            { //8
                code: "ITE231",
                title: "System Administration and Maintenance",
                credits: 4,
                description: "Covers the administration, and maintenance of computer system."
            },

            { //9
                code: "CSC220",
                title: "Web Development II",
                credits: 4,
                description: "Covers advanced web development concepts and techniques for building web application."
            },

            { //10
                code: "ITE254",
                title: "Human Computer Interaction",
                credits: 4,
                description: "Introduces the design and evaluation of usr interface and user interation."
            },

            { //11
                code: "ITE/CSC441",
                title: "Database Managemenet System I",
                credits: 4,
                description: "Introduces database concepts, design, management, and data organization."
            },

            { //12
                code: "PSY101",
                title: "General Psychology",
                credits: 4,
                description: "Intruduces basic concepts of human behavior, thoughts and psychological processes."
            },

            { //13
                code: "MIS103",
                title: "Computer Application",
                credits: 4,
                description: "Introduces common computer applications and their use in everyday and business tasks."
            },

            { //14
                code: "ITE331",
                title: "Introducation to 3D Modeling and Visrtual Reality",
                credits: 4,
                description: "Introduces 3D modeling concepts and basic virtual reality technologies."
            },

            { //15
                code: "MAT101",
                title: "College Algebra I",
                credits: 4,
                description: "Covers fundamental algebraic concepts, equations, functions and problems-solving."
            },

            { //16
                code: "ITE240",
                title: "Operating Systems",
                credits: 4,
                description: "Introduces operating system concepts, processes, memory, files and system management."
            },

            {
                code: "ITE/BSC104",
                title: "Computer Organization",
                credits: 4,
                description: "Introduces computer hardware, architecture, memory, processors, and system organization."
            },

            {
                code: "ITE451",
                title: "AWS Cloud Foundations",
                credits: 4,
                description: "Introduces fundamental cloud computing concepts and basic AWS services."
            }
        ];

        await Course.insertMany(courses);

        console.log("18 courses added successfully");
        process.exit();
    } catch (error) {
        console.error("Course sedding failed:");
        console.error(error);
        process.exit(1);
    }
};

seedCourse();