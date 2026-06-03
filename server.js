const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => console.log("Database synced."))
  .catch(err => console.log("DB sync error: " + err.message));

require("./app/routes/routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Project Task Management running on port ${PORT}`));