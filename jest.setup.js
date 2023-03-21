const dotenv = require('dotenv');

const dotenvConfigOutput = dotenv.config();
if (dotenvConfigOutput.error) {
  console.error(dotenvConfigOutput.error);
  process.exit(1);
}

const envVars = dotenvConfigOutput.parsed;
// console.log(envVars);
