module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        balance: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        phone: {
            type: Sequelize.BIGINT,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        }
    },
    {freezeTableName: true})
};