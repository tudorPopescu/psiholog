module.exports = (sequelize, DataType) => {
  let model = sequelize.define('LogError', {
    action: {
      type: DataType.STRING
    },
    error: {
      type: DataType.STRING
    },
    detail: {
      type: DataType.TEXT
    }
  }, {
    timestamps: true
  });
  return model;
};
