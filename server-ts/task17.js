// две формы на одной странице,
// for first form
var username1 = document.getElementById("username1");
var submit1 = document.getElementById("submit1");
var output1 = document.getElementById("output1");
// for second form
var username2 = document.getElementById("username2");
var submit2 = document.getElementById("submit2");
var output2 = document.getElementById("output2");
submit1 === null || submit1 === void 0 ? void 0 : submit1.addEventListener("click", function () {
    var inputValue1 = username1.value;
    if (inputValue1) {
        output1.textContent = "Hi! " + inputValue1;
    }
    else {
        output1.textContent = "What is ur name?";
    }
});
submit2 === null || submit2 === void 0 ? void 0 : submit2.addEventListener("click", function () {
    var inputValue2 = username2.value;
    if (inputValue2) {
        output2.textContent = "Hi! " + inputValue2;
    }
    else {
        output2.textContent = "What is ur name?";
    }
});
