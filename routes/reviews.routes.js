// routes/reviews.routes.js
  const express = require("express");
  const axios = require("axios");
  const { isAuthenticated } = require("../middleware/jwt.middleware");
  require("dotenv").config();
  
  const router = express.Router();
  
  router.get("/reviews", isAuthenticated, async (req, res) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://opencritic-api.p.rapidapi.com/reviews/game/463',
        params: {
          skip: '20',
          sort: 'popularity'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
      };
  
      const response = await axios.request(options);
      const reviews = response.data;
  
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching game reviews:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  module.exports = router;
  