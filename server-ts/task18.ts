// Форма с активной/неактивной кнопкой

const email = document.getElementById("email") as HTMLInputElement; 
const submit = document.getElementById("submit");
const output = document.getElementById("output");

// let isEmailValid = false;

email.addEventListener("input", () => {
    const value = email.value;
    if (value.includes("@") && value.includes(".")) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
});