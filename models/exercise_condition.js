"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exercise_condition = sequelize.define(
    "Exercise_condition",
    {
      order: DataTypes.INTEGER,
      repeat: DataTypes.INTEGER,
      set: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      exerciseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Exercise_condition.associate = function (models) {
    // associations can be defined here
    Exercise_condition.belongsTo(models.Exercise, {
      foreignKey: "exerciseId",
      as: "exercise",
    });
  };
  return Exercise_condition;
};
