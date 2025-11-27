// Массив любимого
const favorites: string[] = ["Family", "Books", "IT"];

function elements (element : string[]) : void {
    console.log(element[0]);
    console.log(element[element.length - 1]);
}

elements(favorites);