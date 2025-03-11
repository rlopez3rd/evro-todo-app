const sequelize = require("../config/db");
const Todo = require("./Todo");
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = { sequelize, syncDatabase, Todo };
