// routes/reviews.routes.js

const express = require("express");
const axios = require("axios");
const { isAuthenticated } = require("../middleware/jwt.middleware");
require("dotenv").config();

const router = express.Router();

// router.get("/games", isAuthenticated, async (req, res) => {
//   const { gameName } = req.params
//   try {
//     const options = {
//       method: 'GET',
//       url: `https://gamereviews.p.rapidapi.com/games`,
//       headers: {
//         'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
//         'X-RapidAPI-Host': 'gamereviews.p.rapidapi.com'
//       }
//     };

//     const response = await axios.request(options);
//     const reviews = response.data;

//     res.json(reviews);
//   } catch (error) {
//     console.error("Error fetching game reviews:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.get("/game/search/:gameName", isAuthenticated, async (req, res) => {
  const { gameName } = req.params
  try {
    const options = {
      method: 'GET',
      url: `https://opencritic-api.p.rapidapi.com/game/search?criteria=${gameName}`,
      params: {
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

router.get("/game/reviews/:gameID", isAuthenticated, async (req, res) => {
  const { gameID } = req.params
  try {
    const options = {
      method: 'GET',
      url: `https://opencritic-api.p.rapidapi.com/reviews/game/${gameID}`,
      params: {
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

router.get("/game/hall-of-fame", isAuthenticated, async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://opencritic-api.p.rapidapi.com/game/hall-of-fame',
      params: {
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

router.get("/game/:gameID", isAuthenticated, async (req, res) => {
  const { gameID } = req.params;
  try {
    const options = {
      method: 'GET',
      url: `https://opencritic-api.p.rapidapi.com/game/${gameID}`,
      params: {
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
