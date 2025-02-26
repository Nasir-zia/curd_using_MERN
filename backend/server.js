const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoutes"); 
const cors = require("cors")

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 8000, () => {
      console.log("Running successfully at", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(userRoutes)
