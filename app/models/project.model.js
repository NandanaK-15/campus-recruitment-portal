module.exports = (sequelize, Sequelize) => {
  return sequelize.define("project", {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, defaultValue: "" },
    priority: { type: Sequelize.ENUM("low","medium","high","critical"), defaultValue: "medium" },
    status: { type: Sequelize.ENUM("planning","active","on_hold","completed","cancelled"), defaultValue: "planning" },
    start_date: { type: Sequelize.DATEONLY },
    end_date: { type: Sequelize.DATEONLY },
    manager_id: { type: Sequelize.INTEGER },
    manager_name: { type: Sequelize.STRING, defaultValue: "" }
  });
};