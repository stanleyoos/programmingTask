const axios = require("axios");

async function printTitles() {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  const allTitles = posts.data.map((post) => post.title);

  // tablica z powtórzeniami
  let repeats = [];

  // tablica pomocnicza
  let result = [];

  allTitles.forEach((title) => {
    if (result.includes(title)) repeats.push(title);
    else result.push(title);
  });
  return repeats.length === 0 ? "Brak powtórzeń" : repeats;
}

printTitles().then((x) => console.log(x));
