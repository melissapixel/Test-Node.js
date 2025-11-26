// Описание структуры пользователя
interface User {
  name: string;
  age: number;
}

// Функция, которая приветствует пользователя
// -- user - аргумент. Он может быть любым
// -- void - означает: «Эта функция ничего не возвращает».
function greetUser(user: User): void {
  console.log("Привет, " + user.name + "! Тебе " + user.age + " лет.");
}

// Создаём пользователя
const me: User = {
  name: "Лена",
  age: 22
};

// Вызываем функцию
greetUser(me);