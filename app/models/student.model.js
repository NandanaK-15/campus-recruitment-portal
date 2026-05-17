module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cgpa: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    skills: {
      type: Sequelize.STRING
    },
    placement_status: {
      type: Sequelize.ENUM("placed", "not_placed", "in_progress"),
      defaultValue: "not_placed"
    },
    company: {
      type: Sequelize.STRING,
      defaultValue: ""
    }
  });
  return Student;
};