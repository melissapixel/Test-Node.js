function get_film(film) {
    // Выводим только фильмы новее 2020 года
    for (var i = 0; i < film.length; i++) {
        var main_film = film[i]; // берём один фильм
        if (main_film.year >= 2025) {
            console.log(main_film.title, "-", main_film.year);
        }
    }
}
var my_films = [
    { title: "Last Winter", author: "Molli Vine", year: 2023 },
    { title: "Our love", year: 2025 },
    { title: "The along cat", year: 2025 }
];
get_film(my_films);
