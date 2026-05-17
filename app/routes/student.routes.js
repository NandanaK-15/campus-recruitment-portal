module.exports = app => {
  const students = require("../controllers/student.controller.js");
  const auth = require("../controllers/auth.controller.js");
  const router = require("express").Router();
  const authRouter = require("express").Router();

  // Auth routes
  authRouter.post("/login", auth.login);
  app.use("/api/auth", authRouter);

  // Student routes
  router.post("/", students.create);
  router.get("/", students.findAll);
  router.get("/placed", students.findPlaced);
  router.get("/:id", students.findOne);
  router.put("/:id", students.update);
  router.delete("/:id", students.delete);

  app.use("/api/students", router);
};