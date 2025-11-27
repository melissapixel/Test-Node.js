const btn = document.getElementById("toggle");
const menu = document.getElementById("menu");

btn?.addEventListener("click", () => {
  if (menu) {
    if (menu.classList.contains("show")) {

      menu.classList.remove("show");
      btn.textContent = "Показать";

    } else {
      menu.classList.add("show");
      btn.textContent = "Скрыть";
    }
  }
});