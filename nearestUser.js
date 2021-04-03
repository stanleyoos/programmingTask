const axios = require("axios");

async function nearestUser() {
  const result = await axios.get("https://jsonplaceholder.typicode.com/users");
  const users = result.data;

  const userLocations = users.map((user) => ({
    username: user.username,
    locations: user.address.geo,
  }));

  const distances = userLocations.map((user, index, array) => {
    const dDistance = array.map((userInside, indexInside) => {
      return nereast(user.locations, userInside.locations);
    });
    return dDistance;
  });
  console.log(distances);

  const indexes = distances.map((array) => {
    let shortest = 180;
    array.forEach((element) => {
      if (element != 0) {
        if (element < shortest) {
          shortest = element;
        }
      }
    });
    return array.indexOf(shortest);
  });

  const results = userLocations.map((user, index, array) => {
    return `${index + 1}: ${user.username} mieszka najbliżej ${
      array[indexes[index]].username
    }`;
  });

  return results;
}

nearestUser().then((response) => console.log(response));

//
// funkcja która przyjmuje dwa obiekty i zwraca odległość między nimi
function nereast(obj1, obj2) {
  let dLatitude = Math.abs(obj2.lat - obj1.lat);
  let dLongitude = Math.abs(obj2.lng - obj1.lng);

  let distance = Math.sqrt(Math.pow(dLatitude, 2) + Math.pow(dLongitude, 2));

  return distance;
}
