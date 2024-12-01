function fetchUserData(id) {
  const userDataUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
  const promise = fetch(userDataUrl);
  return promise;
}

function fetchPosts(id) {
  const postUrl = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;
  const promise = fetch(postUrl);
  return promise;
}

fetchUserData(2)
  .then((response) => {
    return response.json();
  })
  .then((UserData) => {
    console.log('fetched user data is', UserData);
    return fetchPosts(2);
  })
  .then((response) => {
    return response.json();
  })
  .then((posts) => {
    console.log('the returned posts are', posts);
  });
