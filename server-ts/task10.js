var btn = document.getElementById("toggle");
var menu = document.getElementById("menu");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    if (menu) {
        if (menu.style.display === "none") {
            menu.style.display = "block";
            btn.textContent = "Скрыть";
        }
        else {
            menu.style.display = "none";
            btn.textContent = "Показать";
        }
    }
});
