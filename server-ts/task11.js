var btn = document.getElementById("toggle");
var menu = document.getElementById("menu");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    if (menu) {
        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
            btn.textContent = "Показать";
        }
        else {
            menu.classList.add("show");
            btn.textContent = "Скрыть";
        }
    }
});
