const express = require("express");
const app = express();
const path = require("path");
const port = 80;

// app.use(express.urlencoded());

app.get("/", (req, res) => {
  //   console.log(" GET Request: -" + req.body);
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/api", (req, res) => {
  console.log("----------Check url perform--------");
  console.log(req);
  res.send("Hello world! post data");
});

app.listen(port, () => {
  console.log("Server Started!!!");
});
