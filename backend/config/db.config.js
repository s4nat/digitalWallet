require('dotenv').config();
module.exports = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER || "postgres",
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: "verceldb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };