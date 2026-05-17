module.exports = app => {
  const students = require("../controllers/student.controller.js");
  const router = require("express").Router();

  // Create a new student
  router.post("/", students.create);

  // Retrieve all students
  router.get("/", students.findAll);

  // Retrieve placed students
  router.get("/placed", students.findPlaced);

  // Retrieve a single student by id
  router.get("/:id", students.findOne);

  // Update a student by id
  router.put("/:id", students.update);

  // Delete a student by id
  router.delete("/:id", students.delete);

  app.use("/api/students", router);
};