const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const formatDateTime = require("../utils/dateFormatter");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return formatDateTime(this.getDataValue("createdAt"));
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return formatDateTime(this.getDataValue("updatedAt"));
      },
    },
  },
  {
    timestamps: true,
    tableName: "todos",
  }
);

module.exports = Todo;
