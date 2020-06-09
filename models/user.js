"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: DataTypes.UUID,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  // sequelize
  //   .sync({ force: true })
  //   .then((result) => console.log("USER sync success"))
  //   .catch((err) => console.log("USER sync error"));
  return User;
};
