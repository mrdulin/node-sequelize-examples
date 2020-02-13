module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    _id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Student.associate = function(models) {
    Student.hasMany(models.Project, {
      foreignKey: 'student_id',
      as: 'projects',
    });
  };
  return Student;
};
