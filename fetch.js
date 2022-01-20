console.log("check");

async function fetchData() {
  console.log("Inside");
  url = "https://jsonplaceholder.typicode.com/todos";
  const res = await fetch(url);
  console.log("before response" + res);
  const todos = await res.json();
  console.log("todos resolved" + todos);
  return todos;
}

console.log("before calling fetchdata");
let data = fetchData();
console.log("after calling fetchdata");
console.log(data); //
data.then((data) => {
  data.forEach((data) => {
    title = data.title;
    user = data.userId;
    if (user > 1) return;
    console.log("User Id is : " + user + " Title is " + title);
  });
});
