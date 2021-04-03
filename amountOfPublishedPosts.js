const axios = require("axios");

async function printUsersPosts() {
  // fetch users
  const usersData = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  // get 10 users
  const users = usersData.data;

  // fetch posts
  const postsData = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  // get 100 posts
  const posts = postsData.data;

  let postsAmount = [];

  // array of users: [[username, id, posts], ... ]
  users.forEach((user) => {
    postsAmount.push([user.username, user.id, 0]);
  });

  posts.forEach((post) => {
    postsAmount[post.userId - 1][2]++;
  });

  return postsAmount.map((user) => `${user[0]} napisał(a) ${user[2]} postów`);
}

printUsersPosts().then((x) => console.log(x));
