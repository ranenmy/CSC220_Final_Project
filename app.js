require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
  app.use(express.json());
  
  app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("CSC220 Course Registration API is running")
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/offerings", require("./routes/offeringRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/me", require("./routes/meRoutes"));


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Invalid JSON body" });
    }
    if (err.status && err.status >= 400 && err.status < 500) {
        return res.status(err.status).json({ message: err.message });
    }
    if (err.code === 11000) return res.status(409).json({ message: "A unique field already exists" });
    if (["ValidationError", "CastError", "StrictModeError"].includes(err.name)) {
        return res.status(400).json({ message: "Invalid field value or missing required field" });
    }
    console.error(err.name); // Do not expose database details or credentials.
    res.status(500).json({ message: "Something went wrong" });
});

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
        });
    } catch {
        console.error("Server could not start. Check the database connection.");
        process.exitCode = 1;
    }
}
if (require.main === module) {
    start();
}

module.exports = app;
