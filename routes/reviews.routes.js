// routes/reviews.routes.js
// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// router.get("/game-reviews", async (req, res) => {
//   try {
//     const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
//     const apiUrl = "https://api.example.com/game-reviews";
//     const response = await axios.get(apiUrl, { headers: { "Api-Key": apiKey } });
//     const reviews = response.data; // Adjust based on the actual structure of the API response
//     res.json(reviews);
//   } catch (error) {
//     console.error("Error fetching game reviews:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;