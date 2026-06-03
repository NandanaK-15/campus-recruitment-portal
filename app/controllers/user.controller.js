const db = require("../models");
const User = db.users;

exports.create = async (req, res) => {
  try {
    const exists = await User.findOne({ where: { email: req.body.email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["name", "ASC"]] });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Updated successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};