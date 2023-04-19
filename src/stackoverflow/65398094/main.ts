import { Service } from './models';
import { sequelize } from '../../examples/db';

async function seed() {
  await sequelize.sync({ force: true });
  await Service.create(
    {
      User: { email: 'teresa@teng.com', password: 123 },
    },
    { include: [sequelize.models['User']] },
  );
}

async function main(req) {
  await seed();
  console.log(sequelize.models);
  const service = await Service.findByPk(req.params.service_id, {
    include: [
      {
        model: Service.sequelize!.models['User'],
        attributes: {
          exclude: ['password'],
        },
      },
    ],
  });
  console.log(service);
}

// eslint-disable-next-line @typescript-eslint/camelcase
main({ params: { service_id: 1 } });
