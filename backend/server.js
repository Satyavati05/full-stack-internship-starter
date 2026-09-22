const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
    {
        id: 1,
        firstName: "Satyavati",
        lastName: "Thakur",
        course: "MCA",
        age: 24
    },
    {
        id: 2,
        firstName: "Aman",
        lastName: "Sharma",
        course: "B.Tech",
        age: 22
    },
    {
        id: 3,
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
    const newStudent = {
        id: students.length
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        ...req.body
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.course = req.body.course;
    student.age = req.body.age;

    res.json(student);
});


app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

app.listen(5000, () => {
    console.log("Full-Stack Internship Backend is running!");
});