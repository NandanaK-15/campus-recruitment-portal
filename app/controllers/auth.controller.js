const db = require("../models");
const User = db.users;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@company.com" && password === "admin123") {
    return res.json({ success: true, role: "admin", name: "Admin", id: 0, email });
  }
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
    if (user.status === "inactive") return res.status(401).json({ success: false, message: "Account is inactive. Contact admin." });
    res.json({ success: true, role: user.role, name: user.name, id: user.id, email: user.email, department: user.department });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};