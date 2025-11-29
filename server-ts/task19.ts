// Валидация в реальном времени + визуальная обратная связь

const email = document.getElementById("email") as HTMLInputElement; 
const submit = document.getElementById("submit");
const emailError = document.getElementById("email-error");

let isEmailValid = false;


email.addEventListener("input", () => {
    const value = email.value;
    if (value.includes("@") && value.includes(".")) {
        submit.disabled = false;
        emailError.style.display = "none";
        email.classList.remove("invalid");
    } else {
        submit.disabled = true;
        emailError.textContent = "Email должен содержать @ и ."; 
        emailError.style.display = "block";
        email.classList.add("invalid");
    }
});