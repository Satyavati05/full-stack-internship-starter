const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
    {
        firstName: "Satyavati",
        lastName: "Thakur",
        course: "MCA",
        age: 24
    },
    {
        firstName: "Aman",
        lastName: "Sharma",
        course: "B.Tech",
        age: 22
    },
    {
        firstName: "Priya",
        lastName: "Singh",
        course: "M.Tech",
        age: 25
    }
];

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from the Full-Stack Internship Backend!"
    });
});

app.get("/api/students", (req, res) => {
    res.json(students);
});

app.post("/api/students", (req, res) => {
    const newStudent = req.body;

    students.push(newStudent);

    res.status(201).json(newStudent);
});

app.listen(5000, () => {
    console.log("Full-Stack Internship Backend is running!");
});