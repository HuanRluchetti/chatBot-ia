const envalid = require("envalid");

const validateEnv = () => {
  envalid.cleanEnv(process.env, {
    NODE_ENV: envalid.str(),
    PORT: envalid.port(),
    POSTGRES_HOST: envalid.str(),
    POSTGRES_PORT: envalid.port(),
    POSTGRES_USER: envalid.str(),
    POSTGRES_PASSWORD: envalid.str(),
    POSTGRES_DB: envalid.str(),
  });
};

module.exports = validateEnv;
