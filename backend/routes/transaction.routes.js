module.exports = (app) => {
  const transaction = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  router.post("/createTransaction", transaction.createTransaction);
  router.get("/:userId", transaction.findAll);
  app.use("/digiwallet/transaction", router);
};
