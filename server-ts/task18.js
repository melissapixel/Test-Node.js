// Форма с активной/неактивной кнопкой
var email = document.getElementById("email");
var submit = document.getElementById("submit");
var output = document.getElementById("output");
// let isEmailValid = false;
email.addEventListener("input", function () {
    var value = email.value;
    if (value.includes("@") && value.includes(".")) {
        submit.disabled = false;
    }
    else {
        submit.disabled = true;
    }
});
