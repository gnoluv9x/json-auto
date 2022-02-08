const faker = require("@faker-js/faker/locale/vi");
const fs = require("fs");
//locale
// faker.locale = "vi";

function randomDescription(numberOfDesc) {
  if (numberOfDesc <= 0) return "";
  const listDesc = [];

  Array.from(new Array(numberOfDesc)).forEach(() => {
    listDesc.push(faker.random.word());
  });
  return listDesc.join(", ");
}

function randomRestaurant(numbersOfRestaurant) {
  if (numbersOfRestaurant <= 0) return [];
  const listRestaurant = [];
  Array.from(new Array(numbersOfRestaurant)).forEach(() => {
    const restaurant = {
      restaurantId: faker.datatype.uuid(),
      restaurantName: `${faker.name.lastName()} ${faker.name.firstName()}`,
      phoneNumber: faker.phone.phoneNumber(),
      status: faker.datatype.boolean(),
      address: faker.address.cityName(),
      sets: [
        {
          setId: faker.datatype.uuid(),
          description: randomDescription(3),
          setName: faker.animal.type(),
        },
      ],
    };

    listRestaurant.push(restaurant);
  });

  return listRestaurant;
}

(() => {
  const listRestaurant = randomRestaurant(40);
  // prepare data
  const db = {
    restaurants: listRestaurant,
  };
  // write to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write Successfully =))");
  });
})();
