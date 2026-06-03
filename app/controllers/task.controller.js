const db = require("../models");
const Task = db.tasks;
const { Op } = db.Sequelize;

exports.create = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [["createdAt", "DESC"]] });
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findByProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { project_id: req.params.id }, order: [["createdAt", "DESC"]] });
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findByUser = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { assigned_to: req.params.id }, order: [["due_date", "ASC"]] });
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findOne = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    if (req.body.status === "completed" && !req.body.completed_date) {
      req.body.completed_date = new Date().toISOString().split("T")[0];
    }
    await Task.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Task updated successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } });
    res.json({ message: "Task deleted successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOverdue = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const tasks = await Task.findAll({
      where: { status: { [Op.ne]: "completed" }, due_date: { [Op.lt]: today } },
      order: [["due_date", "ASC"]]
    });
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
};