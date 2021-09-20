module.exports = (sequelize, DataType) => {
  let model = sequelize.define('Appointment', {
    first_name: {
      type: DataType.STRING(255)
    },
    last_name: {
      type: DataType.STRING(255)
    },
    email: {
      type: DataType.STRING(255)
    },
    phone: {
      type: DataType.STRING(20)
    },
    date: {
      type: DataType.DATEONLY
    }
  }, {
    timestamps: true
  });
  return model;
};
