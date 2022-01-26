const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 80;

require("dotenv").config();

app.use(express.json());

app.use(express.static(__dirname + "/index.html"));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/getlist", async (_, res) => {
  const friends = await friendsList.find({});
  res.send(friends);
});

app.post("/api", async (req, res) => {
  const data = req.body;

  // Database
  for (const [_, value] of Object.entries(data)) {
    const user = await new friendsList(value);
    try {
      await user.save();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  const friends = await friendsList.find({});
  res.send(friends);
});

app.post("/deleteId", async (req, res) => {
  const body = req.body;
  try {
    await friendsList.deleteOne({ _id: `${body.id}` });
  } catch (error) {
    res.status(500).send(error);
  }
  const friends = await friendsList.find({});
  res.send(friends);
});

app.listen(port, () => {
  console.log("Server Started!!!");
});

///////////////////////////////////////////-DATABASE-/////////////////////////////////
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const Schema = mongoose.Schema;
const friendsSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

// 1. Create end point /deleteFriend✅
// 2. recieve id console.✅
// 3. delete friend form friend list✅
// 4. send response✅
const friendsList = mongoose.model("friendsList", friendsSchema);
