const db = require("../models");
const Student = db.students;

// Hardcoded admin credentials
const ADMIN = {
  username: "admin",
  password: "admin123",
  role: "admin",
  name: "Administrator"
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check admin
  if (username === ADMIN.username && password === ADMIN.password) {
    return res.json({
      success: true,
      role: "admin",
      name: ADMIN.name,
      message: "Admin login successful"
    });
  }

  // Check student by name as username and id as password
  Student.findOne({ where: { name: username } })
    .then(student => {
      if (!student) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      // Student password is their id (simple for demo)
      if (String(student.id) !== String(password)) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      return res.json({
        success: true,
        role: "student",
        name: student.name,
        id: student.id,
        message: "Student login successful"
      });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message });
    });
};