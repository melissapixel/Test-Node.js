// Простая форма ввода имени

// as HTMLInputElement — это утверждение типа
const username = document.getElementById("username") as HTMLInputElement; 
const submit = document.getElementById("submit");
const output = document.getElementById("output");


submit?.addEventListener("click", () => {
  const inputValue = username.value;
  if (inputValue) {
    output.textContent = "Hi! " + inputValue;
  } else {
    output.textContent = "What is ur name?";
  }
});