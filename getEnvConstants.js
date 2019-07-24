const fs = require('fs');

const dotenvFiles = [
  '.env'
];

const frontendConstants = [
  'APP_NAME',
  'GRAPHQL_URL',
  'MONGO_DB_KEY'
];

const getEnvConstants = () => {
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile
        })
      );
    }
  });

  const arrayToObject = (array) =>
    array.reduce((obj, item, key) => {
      obj[item] = JSON.stringify(process.env[item]);
      return obj
    }, {});
  
  return arrayToObject(frontendConstants)
}

module.exports = getEnvConstants;