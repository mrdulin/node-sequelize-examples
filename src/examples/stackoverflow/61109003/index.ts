import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Project extends Model {}
Project.init({}, { sequelize, modelName: 'projects' });

class ProjectVersion extends Model {}
ProjectVersion.init(
  {
    version: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'project_versions' },
);

class ProjectVersionOverview extends Model {}
ProjectVersionOverview.init({ text: DataTypes.STRING }, { sequelize, modelName: 'project_version_overviews' });

Project.hasMany(ProjectVersion);
ProjectVersion.belongsTo(Project);

ProjectVersion.hasMany(ProjectVersionOverview);
ProjectVersionOverview.belongsTo(ProjectVersion);

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    await Project.create(
      {
        project_versions: [
          {
            project_version_overviews: [{ text: 'a' }, { text: 'b' }],
          },
          {
            project_version_overviews: [{ text: 'x' }, { text: 'y' }, { text: 'z' }],
          },
        ],
      },
      { include: [{ model: ProjectVersion, include: [ProjectVersionOverview] }] },
    );
    // test
    const result = await Project.findOne({
      where: { id: 1 },
      include: [
        {
          model: ProjectVersion,
          attributes: ['version'],
          include: [
            {
              model: ProjectVersionOverview,
              attributes: ['text'],
            },
          ],
        },
      ],
      raw: true,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
