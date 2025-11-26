// Разрешаем ТОЛЬКО эти два варианта
type TypeRole = "user" | "admin";

interface Account {
    username: string;
    role: TypeRole;
}

function printAccount (user: Account) : void {
    console.log('Name - ' + user.username + ". Role - " + user.role + ".");
}


const user2 : Account = {
    username: "Mel",
    role: "admin"
}

const user3 : Account = {
    username: "Pavel",
    role: "user"
}

const user4 : Account = {
    username: "Loli",
    role: "moderator" // mistake
}

printAccount(user4);
printAccount(user2);
printAccount(user3);