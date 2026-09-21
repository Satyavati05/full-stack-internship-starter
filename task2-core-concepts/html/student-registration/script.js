const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

const students = [
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
        age: 28
    }
];

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const fName = document.getElementById("fname").value.trim();
    const lName = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const course = document.getElementById("course").value;

    if (fName.trim() === "") {
        message.textContent = "Please enter your first name.";
        return;
    }

    if (lName.trim() === "") {
        message.textContent = "Please enter your last name.";
        return;
    }

    if (email.trim() === "") {
        message.textContent = "Please enter your email.";
        return;
    }
    if (!email.includes("@") || !email.includes("gmail.com")) {
        message.textContent = "Please enter a valid email address.";
        return;
    }


    if (dob === "") {
        message.textContent = "Please enter your date of birth.";
        return;
    }

    if (gender === "") {
        message.textContent = "Please enter your gender.";
        return;
    }


    if (phone === "") {
        message.textContent = "Please enter your phone number.";
        return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
        message.textContent = "Phone number must be 10 digits.";
        return;
    }

    if (address === "") {
        message.textContent = "Please enter your address.";
        return;
    }

    if (course === "" || course === "Select") {
        message.textContent = "Please select a course.";
        return;
    }
    message.style.color = "green"; //ALL CORRECT---SUCCESS MESSAGE
    message.textContent = "Welcome, " + fName + "! Registration successful for the " + course + " course.";
});
