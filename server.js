// server.js

const app = require("./app");

// const PORT = process.env.PORT || 5005;
const PORT = process.env.PORT || 'https://game-bard-guild-backend.onrender.com';


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
