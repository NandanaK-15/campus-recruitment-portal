const db = require("../models");
const Student = db.students;

// Create new student
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty" });
    return;
  }

  const student = {
    name: req.body.name,
    department: req.body.department,
    cgpa: req.body.cgpa,
    skills: req.body.skills,
    placement_status: req.body.placement_status || "not_placed",
    company: req.body.company || ""
  };

  Student.create(student)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating student"
      });
    });
};

// Get all students
exports.findAll = (req, res) => {
  Student.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving students"
      });
    });
};

// Get single student
exports.findOne = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Student with id=${id} not found` });
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving student id=" + id });
    });
};

// Update student
exports.update = (req, res) => {
  const id = req.params.id;
  Student.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Student updated successfully" });
      else res.send({ message: `Cannot update student id=${id}` });
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating student id=" + id });
    });
};

// Delete student
exports.delete = (req, res) => {
  const id = req.params.id;
  Student.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Student deleted successfully" });
      else res.send({ message: `Cannot delete student id=${id}` });
    })
    .catch(err => {
      res.status(500).send({ message: "Error deleting student id=" + id });
    });
};

// Get placed students
exports.findPlaced = (req, res) => {
  Student.findAll({ where: { placement_status: "placed" } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving placed students" });
    });
};