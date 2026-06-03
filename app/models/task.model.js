module.exports = (sequelize, Sequelize) => {
  return sequelize.define("task", {
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, defaultValue: "" },
    priority: { type: Sequelize.ENUM("low","medium","high","critical"), defaultValue: "medium" },
    status: { type: Sequelize.ENUM("todo","in_progress","review","completed"), defaultValue: "todo" },
    project_id: { type: Sequelize.INTEGER, allowNull: false },
    project_name: { type: Sequelize.STRING, defaultValue: "" },
    assigned_to: { type: Sequelize.INTEGER },
    assigned_name: { type: Sequelize.STRING, defaultValue: "" },
    created_by: { type: Sequelize.INTEGER },
    due_date: { type: Sequelize.DATEONLY },
    completed_date: { type: Sequelize.DATEONLY, allowNull: true }
  });
};