module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const users = require("../controllers/user.controller.js");
  const projects = require("../controllers/project.controller.js");
  const tasks = require("../controllers/task.controller.js");

  const express = require("express");

  const authRouter = express.Router();
  authRouter.post("/login", auth.login);
  app.use("/api/auth", authRouter);

  const userRouter = express.Router();
  userRouter.get("/", users.findAll);
  userRouter.post("/", users.create);
  userRouter.get("/:id", users.findOne);
  userRouter.put("/:id", users.update);
  userRouter.delete("/:id", users.delete);
  app.use("/api/users", userRouter);

  const projectRouter = express.Router();
  projectRouter.get("/stats", projects.getStats);
  projectRouter.get("/", projects.findAll);
  projectRouter.post("/", projects.create);
  projectRouter.get("/:id", projects.findOne);
  projectRouter.put("/:id", projects.update);
  projectRouter.delete("/:id", projects.delete);
  app.use("/api/projects", projectRouter);

  const taskRouter = express.Router();
  taskRouter.get("/overdue", tasks.getOverdue);
  taskRouter.get("/", tasks.findAll);
  taskRouter.post("/", tasks.create);
  taskRouter.get("/project/:id", tasks.findByProject);
  taskRouter.get("/user/:id", tasks.findByUser);
  taskRouter.get("/:id", tasks.findOne);
  taskRouter.put("/:id", tasks.update);
  taskRouter.delete("/:id", tasks.delete);
  app.use("/api/tasks", taskRouter);
};