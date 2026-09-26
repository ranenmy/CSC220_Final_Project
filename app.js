require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("CSC220 Course Registration API is running")
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});