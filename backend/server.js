const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserData = require("./Models/UserModel")

dotenv.config();


const app = express(); 

app.use(express.json()); 

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("Running successfully at", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log(error, "error");
  });

  app.use(UserData)

