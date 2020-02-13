module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    project_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    repoUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    liveUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
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

  Project.associate = function(models) {
    Project.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
      onDelete: 'CASCADE',
    });
  };
  return Project;
};
