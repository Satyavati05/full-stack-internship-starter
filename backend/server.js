const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

function validateStudent(data) {
    const { firstName, lastName, course, age } = data;

    if (!firstName || !lastName || !course || age === undefined) {
        return "All fields are required";
    }

    if (typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof course !== "string") {
        return "Name and course must be text";
    }

    if (!Number.isInteger(age) || age <= 0) {
        return "Age must be a positive number";
    }

    return null;
}


app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from the Full-Stack Internship Backend!"
    });
});

app.get("/api/students", (req, res) => {

    console.log("GET request received:", req.originalUrl);
    console.log("Course:", req.query.course);

    const { course } = req.query;

    if (course) {
        const students = db
            .prepare("SELECT * FROM students WHERE course = ?")
            .all(course);

        return res.json(students);
    }

    const students = db.prepare("SELECT * FROM students").all();

    res.json(students);
});

app.post("/api/students", (req, res) => {
    const { firstName, lastName, course, age } = req.body;

    const validationError = validateStudent(req.body);
    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const statement = db.prepare(`
        INSERT INTO students (firstName, lastName, course, age)
        VALUES (?, ?, ?, ?)
    `);

    const result = statement.run(firstName, lastName, course, age);

    const newStudent = db
        .prepare("SELECT * FROM students WHERE id = ?")
        .get(result.lastInsertRowid);

    res.status(201).json(newStudent);
});

app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const { firstName, lastName, course, age } = req.body;

    const validationError = validateStudent(req.body);
    
    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const statement = db.prepare(`
        UPDATE students
        SET firstName = ?, lastName = ?, course = ?, age = ?
        WHERE id = ?
    `);

    const result = statement.run(
        firstName,
        lastName,
        course,
        age,
        id
    );

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const updatedStudent = db
        .prepare("SELECT * FROM students WHERE id = ?")
        .get(id);

    res.json(updatedStudent);
});


app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const statement = db.prepare(`
        DELETE FROM students
        WHERE id = ?
    `);

    const result = statement.run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
}

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(5000, () => {
    console.log("Full-Stack Internship Backend is running!");
});
