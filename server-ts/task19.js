// Профессиональная валидация email
var email = document.getElementById("email");
var submit = document.getElementById("submit");
var emailError = document.getElementById("email-error");
var isEmailValid = false;
email.addEventListener("input", function () {
    var value = email.value;
    if (value.includes("@") && value.includes(".")) {
        submit.disabled = false;
        emailError.style.display = "none";
        email.classList.remove("invalid");
    }
    else {
        submit.disabled = true;
        emailError.textContent = "Email должен содержать @ и .";
        emailError.style.display = "block";
        email.classList.add("invalid");
    }
});
