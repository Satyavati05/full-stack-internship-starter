const studentForm = document.getElementById("studentForm");
const message = document.getElementById("message");
let editingStudentId = null;

studentForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const course = document.getElementById("course").value.trim();
    const age = Number(document.getElementById("age").value);

    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        course: course,
        age: age
    };

    console.log("Editing student ID:", editingStudentId);

    if (editingStudentId !== null) {

    try {

        const response = await fetch(
            `http://localhost:5000/api/students/${editingStudentId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStudent)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log("Student updated:", data);

        message.textContent = "Student updated successfully!";

        editingStudentId = null;

        studentForm.reset();

        getStudents();

    } catch (error) {

        console.error("Something went wrong:", error);
        message.textContent = "Failed to update student.";

    }

    return;
}

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

        message.textContent = "Student added successfully!";

        studentForm.reset();

        getStudents();

    } catch (error) {
        console.error("Something went wrong:", error);
        message.textContent = "Failed to add student.";
    }
});


async function getStudents() {

    try {
        const response = await fetch("http://localhost:5000/api/students");

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const students = await response.json();

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        students.forEach(student => {

            const studentElement = document.createElement("div");

            studentElement.textContent =
                `${student.firstName} ${student.lastName} | ${student.course} | Age: ${student.age}`;

            const editButton = document.createElement("button");

            editButton.textContent = "Edit";

            editButton.addEventListener("click", () => {
                editStudent(student);
            });

            studentElement.appendChild(editButton);


            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", () => {
                deleteStudent(student.id);
            });

            studentElement.appendChild(deleteButton);

            studentList.appendChild(studentElement);
        });

    } catch (error) {
        console.error("Something went wrong:", error);
    }
}


function editStudent(student) {

    editingStudentId = student.id;

    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("course").value = student.course;
    document.getElementById("age").value = student.age;

    message.textContent = "Editing student...";

}


async function deleteStudent(id) {

    try {

        const response = await fetch(
            `http://localhost:5000/api/students/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log("Delete result:", data);

        getStudents();

    } catch (error) {

        console.error("Something went wrong:", error);

    }
}


getStudents();