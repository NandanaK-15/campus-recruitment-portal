const db = require("../models");
const Project = db.projects;
const Task = db.tasks;

exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [["createdAt", "DESC"]] });
    res.json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findOne = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    await Project.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Updated successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await Task.destroy({ where: { project_id: req.params.id } });
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ message: "Project and its tasks deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getStats = async (req, res) => {
  try {
    const { Op } = db.Sequelize;
    const today = new Date().toISOString().split("T")[0];
    const [totalProjects, activeProjects, completedProjects, totalTasks, completedTasks, inProgressTasks, overdueTasks, totalUsers] = await Promise.all([
      Project.count(),
      Project.count({ where: { status: "active" } }),
      Project.count({ where: { status: "completed" } }),
      Task.count(),
      Task.count({ where: { status: "completed" } }),
      Task.count({ where: { status: "in_progress" } }),
      Task.count({ where: { status: { [Op.ne]: "completed" }, due_date: { [Op.lt]: today } } }),
      db.users.count({ where: { status: "active" } })
    ]);
    res.json({ totalProjects, activeProjects, completedProjects, totalTasks, completedTasks, inProgressTasks, overdueTasks, totalUsers });
  } catch (err) { res.status(500).json({ message: err.message }); }
};