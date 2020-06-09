"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    "Exercise",
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      trainingId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Exercise.associate = function (models) {
    // associations can be defined here
    Exercise.belongsTo(models.Training, {
      foreignKey: "trainingId",
      as: "training",
    });
  };
  return Exercise;
};
