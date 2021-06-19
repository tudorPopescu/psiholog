module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Unit', {
    name: {
			type: DataType.STRING(255)
		},
    cui: {
      type: DataType.INTEGER,
      allowNull: false,
			unique: true
    },
    email: {
      type: DataType.STRING(255),
      unique: true
    },
    phone: {
      type: DataType.STRING(12)
    },
    fax: {
      type: DataType.STRING(12)
    },
    website: {
      type: DataType.STRING(150)
    },
    emblem: {
      type: DataType.TEXT
    },
    header: {
      type: DataType.TEXT
    }
	}, {
		timestamps: true
	});
	return model;
};