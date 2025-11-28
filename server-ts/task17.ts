// две формы на одной странице

// for first form
const username1 = document.getElementById("username1") as HTMLInputElement; 
const submit1 = document.getElementById("submit1");
const output1 = document.getElementById("output1");

// for second form
const username2 = document.getElementById("username2") as HTMLInputElement; 
const submit2 = document.getElementById("submit2");
const output2 = document.getElementById("output2");


submit1?.addEventListener("click", () => {
  const inputValue1 = username1.value;
  if (inputValue1) {
    output1.textContent = "Hi! " + inputValue1;
  } else {
    output1.textContent = "What is ur name?";
  }
});

submit2?.addEventListener("click", () => {
  const inputValue2 = username2.value;
  if (inputValue2) {
    output2.textContent = "Hi! " + inputValue2;
  } else {
    output2.textContent = "What is ur name?";
  }
});