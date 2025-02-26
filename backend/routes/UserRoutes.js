const express = require("express");
const mongoose = require("mongoose");
const UserData = require("./Models/UserModel.js");




const router = express.Router()


// Create user route
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
  
    try {
      const user = await UserData.create({
        name: name,
        email: email,
        age: age,
      });
  
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get("/", async (req, res) => {
      try {
          const showAll  =await UserData.find()
          res.status(200).json(showAll)
          
          
      } catch (error) {
          console.log(error);
          res.status(400).json({ error: error.message });
          
      }
    res.send("API is running");
  });
 module.exports = router
  