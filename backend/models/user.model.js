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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const encryptedName = CryptoJS.AES.encrypt(
            value,
            process.env.ENCRYPTION_KEY
          ).toString();
          this.setDataValue("name", encryptedName);
        },
        get() {
          const encryptedName = this.getDataValue("name");
          if (encryptedName) {
            const decryptedName = CryptoJS.AES.decrypt(
              encryptedName,
              process.env.ENCRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8);
            return decryptedName;
          }
          return null;
        },
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
    },
    { freezeTableName: true }
  );

  return User;
};
