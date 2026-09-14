const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Full-Stack Internship Backend is running!");
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from the Full-Stack Internship Backend!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy",
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});