// Управление состоянием нескольких полей (форма регистрации)

// имя пользователя
const username = document.getElementById("username") as HTMLInputElement; 
const nameError = document.getElementById("name-error");

// емейл
const email = document.getElementById("email") as HTMLInputElement; 
const emailError = document.getElementById("email-error");

// пароль
const password = document.getElementById("password") as HTMLInputElement; 
const passwordError = document.getElementById("password-error");

// отправка
const submit = document.getElementById("submit");


// управление ссостоянием
let isNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;


function validateName(value: string): boolean {
    if (value.trim().length >= 3) {
        return isNameValid = true;
    } else {
        return isNameValid = false;
    }
}
function validateEmail(value: string): boolean {
    if (value.includes("@") && value.includes(".")) {
        return isEmailValid = true;
    } else {
        return isEmailValid = false;
    }
}
function validatePassword(value: string): boolean {
    if (value.length >= 6 && /\d/.test(value)) {
        return isPasswordValid = true;
    } else {
        return isPasswordValid = false;
    }
}

// слушаем события ввода
username.addEventListener("input", () => { 
    validateName(username.value);
    isFormValid();
});
email.addEventListener("input", () => { 
    validateEmail(email.value);
    isFormValid();
});
password.addEventListener("input", () => { 
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

