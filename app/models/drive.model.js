module.exports = (sequelize, Sequelize) => {
  const Drive = sequelize.define("drive", {
    company_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    package_lpa: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    cgpa_cutoff: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    eligible_departments: {
      type: Sequelize.STRING,
      allowNull: false
    },
    drive_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM("upcoming", "completed", "cancelled"),
      defaultValue: "upcoming"
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: ""
    }
  });
  return Drive;
};