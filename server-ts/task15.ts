const body = document.getElementById("theme");

body?.addEventListener("click", () => {
    if (body) {
        document.body.classList.toggle("theme-dark");
    }
});