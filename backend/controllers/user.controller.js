require("dotenv").config();
const db = require("../models/index");
const User = db.User;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const axios = require("axios");
const crypto = require("crypto");

exports.createUser = async (req, res) => {
  // Authenticate Request
  if (req.header("Authorization") != process.env.API_KEY) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return;
  }
  // Validate request
  if (
    !req.body.name ||
    !req.body.password ||
    !req.body.email
  ) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  const existingUser = await User.findAll({
    where: {
      [Op.or]: [
        {
          email: {
            [Op.eq]: req.body.email,
          },
        },
      ],
    },
  });
  if (existingUser.length != 0) {
    res.status(400).send({
      message: "User already exists!",
    });
    return;
  }
  // Create a User
  const user = {
    name: req.body.name,
    password: req.body.password,
    balance: 0,
    email: req.body.email,
  };
  // Save User in the database (Managed Transaction)
  try {
    const result = await sequelize.transaction(async (t) => {
      const createdUser = await User.create(user, { transaction: t });
      return createdUser;
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findUserByCondition = async (req, res) => {
  // Authenticate Request
  if (req.header("Authorization") != process.env.API_KEY) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return;
  }
  // Validate request
  if (!req.query.email) {
    res.status(400).send({
      message: "Missing email!",
    });
    return;
  }
  const email = req.query.email || " ";
  try {
    const user = await User.findAll({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.eq]: email,
            },
          },
        ],
      },
    });
    if (user.length === 0) {
      res.status(404).json({ message: "User not found", User: null });
    } else {
      res.status(200).json({ message: "User found", User: user });
    }
  } catch (error) {
    console.error("Error while finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserBalance = async (req, res) => {
  // Authenticate Request
  if (req.header("Authorization") != process.env.API_KEY) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return;
  }
  // Validate request
  if (!req.body.user_id || !req.body.amount) {
    res.status(400).send({
      message: "Missing User ID and/or amount!",
    });
    return;
  }
  const user_id = req.body.user_id;
  const amount = req.body.amount;
  const user = await User.findOne({ where: { user_id: user_id } });
  if (user) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const updatedRows = await user.update(
          { balance: user.balance + amount },
          { transaction: t }
        );
        return updatedRows;
      });
      res
        .status(201)
        .json({ message: "User Balance Updated Successfully.", user: result });
    } catch (error) {
      console.error("Error making transaction:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ error: "User Not Found" });
  }
};

exports.deleteUser = async (req, res) => {
  // Authenticate Request
  if (req.header("Authorization") != process.env.API_KEY) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return;
  }
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Missing User ID!",
    });
    return;
  }

  const user_id = req.body.user_id;

  try {
    const result = await sequelize.transaction(async (t) => {
      const userDel = await User.destroy({
        where: { user_id: user_id },
        transaction: t,
      });
      return userDel;
    });

    res
      .status(200)
      .json({ message: "User deleted successfully", "result:": result });
  } catch (error) {
    console.error("Error deleting user:", error);
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
    const user = await User.findAll();
    if (user.length === 0) {
      res.status(404).json({ message: "No Users", User: null });
    } else {
      res.status(200).json({ message: "All Users", User: user });
    }
  } catch (error) {
    console.error("Error while finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
