require("dotenv").config();
const crypto = require("crypto");
const CryptoJS = require("crypto-js");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const encryptedFirstName = CryptoJS.AES.encrypt(
            value,
            process.env.ENCRYPTION_KEY
          ).toString();
          this.setDataValue("firstName", encryptedFirstName);
        },
        get() {
          const encryptedFirstName = this.getDataValue("firstName");
          if (encryptedFirstName) {
            const decryptedFirstName = CryptoJS.AES.decrypt(
              encryptedFirstName,
              process.env.ENCRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8);
            return decryptedFirstName;
          }
          return null;
        },
      },
      lastName: {
        type: Sequelize.STRING,
        set(value) {
          const encryptedLastName = CryptoJS.AES.encrypt(
            value,
            process.env.ENCRYPTION_KEY
          ).toString();
          this.setDataValue("lastName", encryptedLastName);
        },
        get() {
          const encryptedLastName = this.getDataValue("lastName");
          if (encryptedLastName) {
            const decryptedLastName = CryptoJS.AES.decrypt(
              encryptedLastName,
              process.env.ENCRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8);
            return decryptedLastName;
          }
          return null;
        },
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        set(value) {
          const hashedPhone = crypto
            .createHash("sha256")
            .update(value)
            .digest("hex");
          this.setDataValue("phone", hashedPhone);
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        set(value) {
          const hashedEmail = crypto
            .createHash("sha256")
            .update(value)
            .digest("hex");
          this.setDataValue("email", hashedEmail);
        },
      },
    },
    { freezeTableName: true }
  );

  return User;
};
