var body = document.getElementById("theme");
body === null || body === void 0 ? void 0 : body.addEventListener("click", function () {
    if (body) {
        document.body.classList.toggle("theme-dark");
    }
});
