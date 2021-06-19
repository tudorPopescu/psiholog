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
    role: {
      type: DataType.STRING(50)
    },
    active: {
      type: DataType.BOOLEAN
    },
    policy: {
      type: DataType.BOOLEAN
    },
    current_month: {
      type: DataType.DATE
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
  // model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
	return model;
};