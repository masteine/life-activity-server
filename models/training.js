"use strict";
module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define(
    "Training",
    {
      userId: DataTypes.UUID,
      date: DataTypes.DATE,
    },
    {}
  );
  Training.associate = function (models) {
    // associations can be defined here
    Training.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };
  // sequelize
  //   .sync({ force: true })
  //   .then((result) => console.log("USER sync success"))
  //   .catch((err) => console.log("USER sync error"));
  return Training;
};
