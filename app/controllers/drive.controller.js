const db = require("../models");
const Drive = db.drives;
const Student = db.students;
const { Op } = require("sequelize");

exports.create = (req, res) => {
  if (!req.body.company_name) {
    return res.status(400).send({ message: "Company name cannot be empty" });
  }
  const drive = {
    company_name: req.body.company_name,
    role: req.body.role,
    package_lpa: req.body.package_lpa,
    cgpa_cutoff: req.body.cgpa_cutoff,
    eligible_departments: req.body.eligible_departments,
    drive_date: req.body.drive_date,
    status: req.body.status || "upcoming",
    description: req.body.description || ""
  };
  Drive.create(drive)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Drive.findAll({ order: [["drive_date", "ASC"]] })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Drive.findByPk(req.params.id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Drive not found" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Drive.update(req.body, { where: { id: req.params.id } })
    .then(num => {
      if (num == 1) res.send({ message: "Drive updated successfully" });
      else res.send({ message: "Cannot update drive" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Drive.destroy({ where: { id: req.params.id } })
    .then(num => {
      if (num == 1) res.send({ message: "Drive deleted successfully" });
      else res.send({ message: "Cannot delete drive" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getEligibleStudents = (req, res) => {
  Drive.findByPk(req.params.id)
    .then(drive => {
      if (!drive) return res.status(404).send({ message: "Drive not found" });
      const depts = drive.eligible_departments.split(",").map(d => d.trim());
      Student.findAll({
        where: {
          cgpa: { [Op.gte]: drive.cgpa_cutoff },
          department: { [Op.in]: depts }
        }
      }).then(students => res.send({ drive, students }))
        .catch(err => res.status(500).send({ message: err.message }));
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getStats = (req, res) => {
  Promise.all([
    Student.count(),
    Student.count({ where: { placement_status: "placed" } }),
    Student.count({ where: { placement_status: "in_progress" } }),
    Student.count({ where: { placement_status: "not_placed" } }),
    Drive.count(),
    Drive.count({ where: { status: "upcoming" } })
  ]).then(([total, placed, inProgress, notPlaced, totalDrives, upcomingDrives]) => {
    res.send({ total, placed, inProgress, notPlaced, totalDrives, upcomingDrives });
  }).catch(err => res.status(500).send({ message: err.message }));
};