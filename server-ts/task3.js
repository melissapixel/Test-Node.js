// функция
function greetUser(user) {
    console.log('Hello, ' + user.first_name + ' ' + user.last_name);
}
// вставляем данные
var user = {
    first_name: "Mel",
    last_name: "Pixel",
    age: 19
};
greetUser(user);
