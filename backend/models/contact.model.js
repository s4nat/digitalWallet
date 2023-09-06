module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        user_id: {
            type: Sequelize.INTEGER
        },
        friend_id: {
            type: Sequelize.INTEGER
        }
    },
    {freezeTableName: true})
};