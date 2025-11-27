interface Film {
    title: string;
    author?: string;
    year: number;
}

function get_film (film : Film[]) : void {
    // Выводим только фильмы новее 2020 года
    for (let i = 0; i < film.length; i++) {
        const main_film = film[i]; // берём один фильм
        if (main_film.year >= 2025) {
            console.log(main_film.title, "-", main_film.year);
        }
    }
}


const my_films: Film[] = [
    { title: "Last Winter", author: "Molli Vine", year: 2023},
    { title: "Our love", year: 2025},
    { title: "The along cat", year: 2025}
]

get_film(my_films);