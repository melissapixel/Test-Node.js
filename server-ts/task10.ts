const btn = document.getElementById("toggle");
const menu = document.getElementById("menu");

btn?.addEventListener("click", () => { // внимание на ? и if (menu) — это защита, потому что getElementById может вернуть null.
  if (menu) {
    if (menu.style.display === "none") {
      menu.style.display = "block";
      btn.textContent = "Скрыть";
    } else {
      menu.style.display = "none";
      btn.textContent = "Показать";
    }
  }
});