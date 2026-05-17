const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch(err => {
    console.log("Failed to sync database: " + err.message);
  });

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Campus Recruitment Portal API - v2.0",
    version: "1.0.0",
    endpoints: {
      getAllStudents: "GET /api/students",
      getStudent: "GET /api/students/:id",
      getPlaced: "GET /api/students/placed",
      createStudent: "POST /api/students",
      updateStudent: "PUT /api/students/:id",
      deleteStudent: "DELETE /api/students/:id"
    }
  });
});

require("./app/routes/student.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Campus Recruitment Portal running on port ${PORT}`);
});