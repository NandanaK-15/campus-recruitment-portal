module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.ENUM("admin","manager","employee"), defaultValue: "employee" },
    department: { type: Sequelize.STRING, defaultValue: "" },
    designation: { type: Sequelize.STRING, defaultValue: "" },
    status: { type: Sequelize.ENUM("active","inactive"), defaultValue: "active" }
  });
};