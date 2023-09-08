require("dotenv").config();
const db = require("../models/index");
const Transaction = db.Transaction;
const User = db.User;
const sequelize = db.sequelize;
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.createTransaction = async (req, res) => {
  // Authenticate Request
  if (req.header("Authorization") != process.env.API_KEY) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return;
  }
  // Validate request
  if (
    !req.body.from_id ||
    !req.body.to_id ||
    !req.body.amount ||
    req.body.amount < 0
  ) {
    res.status(400).send({
      message: "All fields are required or Amount is negative!",
    });
    return;
  }
  const from_id = req.body.from_id;
  const to_id = req.body.to_id;
  const amount = req.body.amount;

  // Check if Valid
  const userSender = await User.findOne({
    where: { user_id: from_id },
  });
  const userReceiver = await User.findOne({
    where: { user_id: to_id },
  });

  if (!userReceiver || !userSender || from_id === to_id) {
    res.status(400).send({
      message: "User does not exist or User trying to send to himself!",
    });
    return;
  }
  let status_val = 1;
  if (amount > userSender.balance) {
    status_val = 0;
  } else {
    const url = "http://localhost:8080/digiwallet/user/updatebalance";
    const dataSender = {
      user_id: from_id,
      amount: -amount,
    };
    const dataReceiver = {
      user_id: to_id,
      amount: amount,
    };
    const headers = {
      Authorization: process.env.API_KEY,
    };
    axios
      .post(url, dataSender, { headers })
      .then((response) => {
        console.log(
          `POST request to update balance of user:${from_id} successful:`,
          response.data
        );
      })
      .catch((error) => {
        console.error(
          `Error making POST request to update balance of user:${from_id} :`,
          error
        );
        status_val = 0;
      });
    axios
      .post(url, dataReceiver, { headers })
      .then((response) => {
        console.log(
          `POST request to update balance of user:${to_id} successful:`,
          response.data
        );
      })
      .catch((error) => {
        console.error(
          `Error making POST request to update balance of user:${to_id} :`,
          error
        );
        status_val = 0;
      });
  }

  // Create a Transaction
  const new_transaction = {
    to_id: to_id,
    from_id: from_id,
    amount: amount,
    status: status_val,
  };
  // Save Transaction in the database (Managed Transaction)
  try {
    const result = await sequelize.transaction(async (t) => {
      const createdTransaction = await Transaction.create(new_transaction, {
        transaction: t,
      });
      return createdTransaction;
    });
    if (status_val != 1) {
      res.status(250).json({
        message: "Transaction Logged successfully but failed",
        Transaction: result,
      });
    } else {
      res.status(201).json({
        message: "Transaction created successfully",
        Transaction: result,
      });
    }
  } catch (error) {
    console.error("Error creating Transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findAll = async (req, res) => {
  // Authenticate Request
  if (req.header("Authorization") != process.env.API_KEY) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return;
  }
  // Validate request
  try {
    const Transaction = await Transaction.findAll();
    res
      .status(200)
      .json({ message: "All Transactions", Transaction: Transaction });
  } catch (error) {
    console.error("Error while finding Transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
