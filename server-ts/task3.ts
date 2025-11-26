// создаем структуру
interface User {
    first_name: string;
    last_name: string;
    age: number;
}

// функция
function greetUser(user : User): void {
    console.log('Hello, ' + user.first_name + ' ' + user.last_name);
}
 
// вставляем данные
const user: User = {
    first_name: "Mel",
    last_name: "Pixel",
    age: 19 
}

greetUser(user);