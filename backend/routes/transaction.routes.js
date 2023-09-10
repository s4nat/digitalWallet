module.exports = (app) => {
  const transaction = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/createTransaction", transaction.createTransaction);
  router.post(
    "/stripe/webhook",
    express.raw({ type: "application/json" }),
    transaction.stripeWebhook
  );
  router.get("/stripe/topup", transaction.topupTransaction);
  router.get("/topupBalance", transaction.topupBalance);
  router.get("/", transaction.findAll);
  app.use("/digiwallet/transaction", router);
};
router.post();
