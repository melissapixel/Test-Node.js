function printAccount(user) {
    console.log('Name - ' + user.username + ". Role - " + user.role + ".");
}
var user2 = {
    username: "Mel",
    role: "admin"
};
var user3 = {
    username: "Pavel",
    role: "user"
};
var user4 = {
    username: "Loli",
    role: "moderator"
};
printAccount(user4);
printAccount(user2);
printAccount(user3);
