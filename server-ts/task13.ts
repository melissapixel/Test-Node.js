const container = document.getElementById("menu-container");
const btn = document.getElementById("toggle");
const menu = document.getElementById("menu");

let isOpen = false; // состояние

btn?.addEventListener("click", () => {
  isOpen = !isOpen;
  if (menu) {
    if (isOpen === true) {
        btn.textContent = "Скрыть";
        menu.style.display = "block"
    } else {
        btn.textContent = "Показать";
        menu.style.display = "none";
    }
  }
});

document.addEventListener("click", (event) => {
  // Если меню закрыто — выходим
  if (!isOpen) return;

  // Если клик внутри контейнера — выходим (ничего не делаем)
  if (container?.contains(event.target as Node)) {
    return;
  }

  // Иначе — закрываем меню
  isOpen = false;
  if (menu) menu.style.display = "none";
  if (btn) btn.textContent = "Показать";
});