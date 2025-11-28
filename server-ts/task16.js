// Простая форма ввода имени
// as HTMLInputElement — это утверждение типа
var username = document.getElementById("username");
var submit = document.getElementById("submit");
var output = document.getElementById("output");
submit === null || submit === void 0 ? void 0 : submit.addEventListener("click", function () {
    var inputValue = username.value;
    if (inputValue) {
        output.textContent = "Hi! " + inputValue;
    }
    else {
        output.textContent = "What is ur name?";
    }
});
