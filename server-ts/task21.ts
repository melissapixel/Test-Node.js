// Показ ошибок под каждым полем


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
        isNameValid = true;
        nameError.style.display = "none";
        username.classList.remove("invalid");
    } else {
        isNameValid = false;
        nameError.textContent = "Имя должно быть не короче 3 символов.";
        nameError.style.display = "block";
        username.classList.add("invalid");
    }
    return isNameValid;
}
function validateEmail(value: string): boolean {
    if (value.includes("@") && value.includes(".")) {
        isEmailValid = true;
        emailError.style.display = "none";
        email.classList.remove("invalid");
    } else {
        isEmailValid = false;
        emailError.textContent = "Email должен содержать точку после @.";
        emailError.style.display = "block";
        email.classList.add("invalid");
    }
    return isEmailValid;
}
function validatePassword(value: string): boolean {
    if (value.length >= 6 && /\d/.test(value)) {
        isPasswordValid = true;
        passwordError.style.display = "none";
        password.classList.remove("invalid");
    } else {
        isPasswordValid = false;
        passwordError.textContent = "Пароль должен быть не короче 6 символов и содержать цифру.";
        passwordError.style.display = "block";
        password.classList.add("invalid");
    }
    return isPasswordValid;
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