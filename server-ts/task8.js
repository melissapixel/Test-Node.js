function get_first__film(film) {
    console.log("Title - " + film[0].title + ". Author - " + film[0].author);
}
function get_last__film(film) {
    console.log("Title - " + film[film.length - 1].title + ". Author - " + film[film.length - 1].author);
}
var my_films = [
    { title: "Last Winter", author: "Molli Vine", year: 2023 },
    { title: "Our love", year: 2025 },
    { title: "The along cat", year: 2025 }
];
get_first__film(my_films);
get_last__film(my_films);
