const auth = require('../authorization/authentication');
module.exports = (sequelize, DataType) => {
  let model = sequelize.define('User', {
    first_name: {
      type: DataType.STRING(150)
    },
    last_name: {
      type: DataType.STRING(150)
    },
    email: {
      type: DataType.STRING(255),
      unique: true
    },
    phone: {
      type: DataType.STRING(12)
    },
    password: {
      type: DataType.STRING
    },
    salt: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: auth.createSalt
    },
    last_login: {
      type: DataType.DATE,
      defaultValue: sequelize.NOW
    }
  }, {
    timestamps: true
  });
  return model;
};
