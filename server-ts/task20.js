// Управление состоянием нескольких полей (форма регистрации)
// имя пользователя
var username = document.getElementById("username");
var nameError = document.getElementById("name-error");
// емейл
var email = document.getElementById("email");
var emailError = document.getElementById("email-error");
// пароль
var password = document.getElementById("password");
var passwordError = document.getElementById("password-error");
// отправка
var submit = document.getElementById("submit");
// управление ссостоянием
var isNameValid = false;
var isEmailValid = false;
var isPasswordValid = false;
function validateName(value) {
    if (value.trim().length >= 3) {
        return isNameValid = true;
    }
    else {
        return isNameValid = false;
    }
}
function validateEmail(value) {
    if (value.includes("@") && value.includes(".")) {
        return isEmailValid = true;
    }
    else {
        return isEmailValid = false;
    }
}
function validatePassword(value) {
    if (value.length >= 6 && /\d/.test(value)) {
        return isPasswordValid = true;
    }
    else {
        return isPasswordValid = false;
    }
}
// слушаем события ввода
username.addEventListener("input", function () {
    validateName(username.value);
    isFormValid();
});
email.addEventListener("input", function () {
    validateEmail(email.value);
    isFormValid();
});
password.addEventListener("input", function () {
    validatePassword(password.value);
    isFormValid();
});
function isFormValid() {
    submit.disabled = !(isNameValid && isEmailValid && isPasswordValid);
}
// validateName(name);
// validateEmail(email);
// validatePassword(password);
isFormValid();
