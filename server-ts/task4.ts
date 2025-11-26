// Разрешаем ТОЛЬКО эти два варианта
type Gender = "male" | "female";

interface User {
  name: string;
  gender: Gender; // теперь gender может быть ТОЛЬКО "male" или "female"
}

const user1: User = {
  name: "Мел",
  gender: "feale"  // ← если написать "woman" — TypeScript не разрешит!
};

console.log(user1.name + " is " + user1.gender);