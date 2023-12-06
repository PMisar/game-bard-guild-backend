//app.js

require("dotenv/config");
require("./db");
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const articleRouter = require("./routes/article.routes");
app.use("/api", isAuthenticated, articleRouter);

// const taskRouter = require("./routes/task.routes");
// app.use("/api", isAuthenticated, taskRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
