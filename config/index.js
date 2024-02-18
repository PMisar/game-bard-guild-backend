// config/index.js

const express = require("express");

// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

const cors = require("cors");

// Middleware configuration
module.exports = (app) => {
  app.set("trust proxy", 1);

  // app.use(
  //   cors({
  //     origin: ["http://localhost:5173"],
  //   })
  // );
  app.use(
    cors({
      origin: ["https://gamebardguild.netlify.app"],
      credentials: true,
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
