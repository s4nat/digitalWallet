module.exports = (app) => {
  const transaction = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/createTransaction", transaction.createTransaction);
  router.get("/", transaction.findAll);
  app.use("/digiwallet/transaction", router);
};
