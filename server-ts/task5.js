function aboutPet(pet) {
    console.log('Name - ' + pet.name + '. Species - ' + pet.species + ". Age - " + pet.age + '.');
}
var pet1 = {
    name: "Goward",
    species: "cat",
    age: 2
};
var pet2 = {
    name: "Rose",
    species: "dog"
};
aboutPet(pet1);
aboutPet(pet2);
