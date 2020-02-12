import Sequelize, { BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../../db';

class User extends Sequelize.Model {}

class Problem extends Sequelize.Model {
  public getTrack!: BelongsToGetAssociationMixin<Track>;
}

class Track extends Sequelize.Model {}

Problem.init(
  {
    title: { type: Sequelize.STRING, primaryKey: true },
    description: Sequelize.STRING,
    votes: { type: Sequelize.INTEGER, defaultValue: 0 },
  },
  { sequelize, modelName: 'problem' },
);

Track.init(
  {
    name: { type: Sequelize.STRING, primaryKey: true },
  },
  {
    sequelize,
    modelName: 'track',
  },
);

User.init(
  {
    name: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: 'user',
  },
);

User.hasMany(Track);

Track.hasMany(Problem);
Problem.belongsTo(Track);

async function foo() {
  await sequelize.sync({ force: true });

  const u = await User.create({ name: 'foo' });
  const track = await Track.create({ name: 'track_1' });
  const problem = await Problem.create({ title: 'prob_1' });
  await track.addProblems([problem]);
  await u.addTracks([track]);
  const tr = await Track.findByPk('track_1');
  const probs = await tr.getProblems();
  console.log(await tr.countProblems());

  // const prob: Problem = probs[0];
  // const t = await prob.getTrack();
  // console.log('t:', t);

  await sequelize.close();
}

foo();
