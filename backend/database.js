const Database = require("better-sqlite3");

const db = new Database("students.db");

console.log("Database connected successfully!");

db.exec(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        course TEXT NOT NULL,
        age INTEGER NOT NULL
    )
`);

console.log("Students table is ready!");

module.exports = db;