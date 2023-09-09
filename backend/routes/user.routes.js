module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/register", user.createUser);
  router.get("/find", user.findUserByCondition);
  router.delete("/delete", user.deleteUser);
  router.post("/updatebalance", user.updateUserBalance);
  router.get("/", user.findAll);
  app.use("/digiwallet/user", router);
};
