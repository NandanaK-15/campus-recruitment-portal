module.exports = app => {
  const students = require("../controllers/student.controller.js");
  const auth = require("../controllers/auth.controller.js");
  const drives = require("../controllers/drive.controller.js");

  const router = require("express").Router();
  const driveRouter = require("express").Router();
  const authRouter = require("express").Router();

  // Auth
  authRouter.post("/login", auth.login);
  app.use("/api/auth", authRouter);

  // Students
  router.post("/", students.create);
  router.get("/", students.findAll);
  router.get("/placed", students.findPlaced);
  router.get("/:id", students.findOne);
  router.put("/:id", students.update);
  router.delete("/:id", students.delete);
  app.use("/api/students", router);

  // Drives
  driveRouter.get("/stats", drives.getStats);
  driveRouter.post("/", drives.create);
  driveRouter.get("/", drives.findAll);
  driveRouter.get("/:id/eligible", drives.getEligibleStudents);
  driveRouter.get("/:id", drives.findOne);
  driveRouter.put("/:id", drives.update);
  driveRouter.delete("/:id", drives.delete);
  app.use("/api/drives", driveRouter);
};