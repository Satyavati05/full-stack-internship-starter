async function getStudents() {
    try {
        const response = await fetch("http://localhost:5000/api/students");

        if (!response.ok) {
    const errorText = await response.text();

    console.log("Status:", response.status);
    console.log("Server response:", errorText);

    return;
}

        const students = await response.json();

        const studentsContainer = document.getElementById("students");

        studentsContainer.innerHTML = "";

        students.forEach(student => {
            const studentElement = document.createElement("p");

            studentElement.textContent =
                student.firstName + " " +
                student.lastName + " - " +
                student.course + " - Age: " +
                student.age;

            studentsContainer.appendChild(studentElement);
        });

    } catch (error) {
        console.error("Something went wrong:", error);
    }
}

async function addStudent(firstName, lastName, course, age) {

    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        course: course,
        age: Number(age)
    };

    try {
        const response = await fetch("http://localhost:5000/api/students", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newStudent)
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        const data = await response.json();

        console.log("Student added:", data);

        getStudents();

    } catch (error) {
        console.error("Something went wrong:", error);
    }
}

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const course = document.getElementById("course").value.trim();
    const age = document.getElementById("age").value;

    addStudent(firstName, lastName, course, age);

    studentForm.reset();
});


getStudents();