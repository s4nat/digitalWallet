require("dotenv").config();
const CryptoJS = require("crypto-js");

module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    "transactions",
    {
      request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      from_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from_name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const encryptedfromName = CryptoJS.AES.encrypt(
            value,
            process.env.ENCRYPTION_KEY
          ).toString();
          this.setDataValue("from_name", encryptedfromName);
        },
        get() {
          const encryptedfromName = this.getDataValue("from_name");
          if (encryptedfromName) {
            const decryptedfromName = CryptoJS.AES.decrypt(
              encryptedfromName,
              process.env.ENCRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8);
            return decryptedfromName;
          }
          return null;
        },
      },
      to_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to_name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const encryptedtoName = CryptoJS.AES.encrypt(
            value,
            process.env.ENCRYPTION_KEY
          ).toString();
          this.setDataValue("to_name", encryptedtoName);
        },
        get() {
          const encryptedtoName = this.getDataValue("to_name");
          if (encryptedtoName) {
            const decryptedtoName = CryptoJS.AES.decrypt(
              encryptedtoName,
              process.env.ENCRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8);
            return decryptedtoName;
          }
          return null;
        },
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return Transaction;
};
