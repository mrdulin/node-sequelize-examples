import { Fee } from './model';
import { registerHandlers } from './handers';

(async function bootstrap() {
  console.log('boostrap fee service');
  try {
    await Fee.sync({ force: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  registerHandlers();
})();
