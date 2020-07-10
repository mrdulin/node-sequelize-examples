import { Account } from './model';
import { registerHandlers } from './handlers';

(async function bootstrap() {
  console.log('boostrap account service');
  try {
    await Account.sync({ force: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  registerHandlers();
})();
