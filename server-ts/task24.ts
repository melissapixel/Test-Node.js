// Автофокус на первое поле + подсветка при фокусе


// имя пользователя
const username = document.getElementById("username") as HTMLInputElement; 
const nameError = document.getElementById("name-error");
// емейл
const email = document.getElementById("email") as HTMLInputElement; 
const emailError = document.getElementById("email-error");
// пароль
const password = document.getElementById("password") as HTMLInputElement; 
const passwordError = document.getElementById("password-error");
// очистить все поля
const resetBtn = document.getElementById("reset");
// отправка
const submit = document.getElementById("submit");


// управление ссостоянием
let isNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;


// Загружаем черновик
const savedUsername = localStorage.getItem("draft-username");
if (savedUsername !== null) {
  username.value = savedUsername;
  validateName(savedUsername); // чтобы обновить ошибки и состояние
}
const savedEmail = localStorage.getItem("draft-email");
if (savedEmail !== null) {
  email.value = savedEmail;
  validateEmail(savedEmail); // чтобы обновить ошибки и состояние
}


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
    // Сохраняем значение ПЕРЕД return
    localStorage.setItem("draft-username", value);
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
    localStorage.setItem("draft-email", value);
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

// слушаем клик по кнопке "очистить все"
resetBtn?.addEventListener("click", () => {
    // очищаем поля
    username.value = ""; 
    email.value = ""; 
    password.value = "";

    // скрываем все ошибки
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // убираем подчеркивание красным поля с ошибками
    username.classList.remove("invalid");
    email.classList.remove("invalid");
    password.classList.remove("invalid"); 

    // изменяем флаги
    isNameValid = false;
    isEmailValid = false;
    isPasswordValid = false;
    submit.disabled = true;

    // убираем localStorage
    localStorage.removeItem("draft-username");
    localStorage.removeItem("draft-email");
});


// слушаем событие фокуса и потери фокуса
function setupFocus(element: HTMLInputElement) {
  element.addEventListener("focus", () => element.classList.add("focus"));
  element.addEventListener("blur", () => element.classList.remove("focus"));
}
setupFocus(username);
setupFocus(email);
setupFocus(password);

// проверка валидации всех полей
function isFormValid() {
    submit.disabled = !(isNameValid && isEmailValid && isPasswordValid);
}

// ставим автоматически фокус на первое поле
username.focus();