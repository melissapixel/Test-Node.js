// Хранение черновика безопасно — с таймером автоочистки. Автоочистка черновика через 30 минут
// имя пользователя
var username = document.getElementById("username");
var nameError = document.getElementById("name-error");
// емейл
var email = document.getElementById("email");
var emailError = document.getElementById("email-error");
// пароль
var password = document.getElementById("password");
var passwordError = document.getElementById("password-error");
// очистить все поля
var resetBtn = document.getElementById("reset");
// отправка
var submit = document.getElementById("submit");
// управление ссостоянием
var isNameValid = false;
var isEmailValid = false;
var isPasswordValid = false;
// Загружаем черновик
var savedUsername = localStorage.getItem("draft-username");
var savedEmail = localStorage.getItem("draft-email");
var timestamp = localStorage.getItem("draft-timestamp", Date.now().toString());
// При загрузке — проверяем свежесть
if (timestamp) {
    var age = Date.now() - parseInt(timestamp);
    if (age < 1800000) { // 30 минут в миллисекундах
        // восстанавливаем
        if (savedUsername !== null) {
            username.value = savedUsername;
            validateName(savedUsername); // чтобы обновить ошибки и состояние
        }
        if (savedEmail !== null) {
            email.value = savedEmail;
            validateEmail(savedEmail); // чтобы обновить ошибки и состояние
        }
    }
    else {
        // удаляем старый черновик
        localStorage.clear(); // удаляет все данные на сайте — включая тему, настройки и т.д.
    }
}
function validateName(value) {
    if (value.trim().length >= 3) {
        isNameValid = true;
        nameError.style.display = "none";
        username.classList.remove("invalid");
    }
    else {
        isNameValid = false;
        nameError.textContent = "Имя должно быть не короче 3 символов.";
        nameError.style.display = "block";
        username.classList.add("invalid");
    }
    // Сохраняем значение ПЕРЕД return
    localStorage.setItem("draft-username", value);
    localStorage.setItem("draft-timestamp", Date.now().toString());
    return isNameValid;
}
function validateEmail(value) {
    if (value.includes("@") && value.includes(".")) {
        isEmailValid = true;
        emailError.style.display = "none";
        email.classList.remove("invalid");
    }
    else {
        isEmailValid = false;
        emailError.textContent = "Email должен содержать точку после @.";
        emailError.style.display = "block";
        email.classList.add("invalid");
    }
    localStorage.setItem("draft-email", value);
    localStorage.setItem("draft-timestamp", Date.now().toString());
    return isEmailValid;
}
function validatePassword(value) {
    if (value.length >= 6 && /\d/.test(value)) {
        isPasswordValid = true;
        passwordError.style.display = "none";
        password.classList.remove("invalid");
    }
    else {
        isPasswordValid = false;
        passwordError.textContent = "Пароль должен быть не короче 6 символов и содержать цифру.";
        passwordError.style.display = "block";
        password.classList.add("invalid");
    }
    return isPasswordValid;
}
// слушаем события ввода для валидации
username.addEventListener("input", function () {
    // 1. Очищаем значение от ненужных символов
    var cleanValue = username.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");
    // 2. Обновляем поле
    username.value = cleanValue;
    // 3. Валидируем очищенное значение
    validateName(cleanValue);
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
// слушаем клик по кнопке "очистить все"
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", function () {
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
function setupFocus(element) {
    element.addEventListener("focus", function () { return element.classList.add("focus"); });
    element.addEventListener("blur", function () { return element.classList.remove("focus"); });
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
