const form = document.getElementById("registrationForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fName = document.getElementById("fname").value;

    const message = document.getElementById("message");

    message.textContent = "Welcome, " + fName + "!";
});