interface Pet {
    name: string;
    species: string;
    age?: number;
}

function aboutPet (pet : Pet): void {
    console.log('Name - ' + pet.name + '. Species - ' + pet.species + ". Age - " + pet.age + '.');
}

const pet1: Pet = {
    name: "Goward",
    species: "cat",
    age: 2
}

const pet2: Pet = {
    name: "Rose",
    species: "dog"
}

aboutPet(pet1);
aboutPet(pet2);