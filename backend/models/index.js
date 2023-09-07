const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(`postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:5432/${dbConfig.DB}?sslmode=${dbConfig.sslmode}`)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.transactions = require("./transaction.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;