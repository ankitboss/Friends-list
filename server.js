const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const port = 80;

require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/api", async (req, res) => {
  const data = req.body;

  // Database
  for (const [_, value] of Object.entries(data)) {
    const user = new friendsList(value);
    try {
      await user.save();
      const friends = await friendsList.find({});
      res.send(friends);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Save data to the file!!!!
  // for (const [_, value] of Object.entries(body)) {
  //   fs.appendFileSync("friendsList.txt", `${value.name},`, "utf8");
  // }

  // Read data from the file
  // const file = fs.readFileSync("friendsList.txt", "utf8");
  // res.json(file.split(","));
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
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const friendsList = mongoose.model("friendsList", friendsSchema);
