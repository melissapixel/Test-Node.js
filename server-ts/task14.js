var btn = document.getElementById("toggle");
var menu = document.getElementById("menu");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    if (menu) {
        menu.classList.toggle("show");
    }
});
