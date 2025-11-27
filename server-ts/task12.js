var btn = document.getElementById("toggle");
var menu = document.getElementById("menu");
var isOpen = false; // состояние
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    isOpen = !isOpen;
    if (menu) {
        if (isOpen === true) {
            //   menu.classList.remove("show");
            btn.textContent = "Скрыть";
            menu.style.display = "block";
        }
        else {
            //   menu.classList.add("show");
            btn.textContent = "Показать";
            menu.style.display = "none";
        }
    }
});
