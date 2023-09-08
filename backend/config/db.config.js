require('dotenv').config();

var configs = {};

console.log(`\n\nYou are currently in ${process.env.ENVIRONMENT} environment.\n\n`)
if (process.env.ENVIRONMENT == "dev") {
  configs = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.LOCAL_PASSWORD,
    DB: "wallet_tt",
    dialect: "postgres",
    sslmode: "disable"
  };
}

else if (process.env.ENVIRONMENT == "prod") {
  configs = {
    HOST: process.env.POSTGRES_HOST,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: "verceldb",
    dialect: "postgres",
    sslmode: "require"
  };
}


module.exports = configs;