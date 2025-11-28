const btn = document.getElementById("toggle");
const menu = document.getElementById("menu");

btn?.addEventListener("click", () => {
    if (menu) {
        menu.classList.toggle("show");
    }
});