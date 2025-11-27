var container = document.getElementById("menu-container");
var btn = document.getElementById("toggle");
var menu = document.getElementById("menu");
var isOpen = false; // состояние
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    isOpen = !isOpen;
    if (menu) {
        if (isOpen === true) {
            btn.textContent = "Скрыть";
            menu.style.display = "block";
        }
        else {
            btn.textContent = "Показать";
            menu.style.display = "none";
        }
    }
});
document.addEventListener("click", function (event) {
    // Если меню закрыто — выходим
    if (!isOpen)
        return;
    // Если клик внутри контейнера — выходим (ничего не делаем)
    if (container === null || container === void 0 ? void 0 : container.contains(event.target)) {
        return;
    }
    // Иначе — закрываем меню
    isOpen = false;
    if (menu)
        menu.style.display = "none";
    if (btn)
        btn.textContent = "Показать";
});
