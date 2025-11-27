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