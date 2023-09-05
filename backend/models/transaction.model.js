module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
        request_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        from_id: {
            type: Sequelize.INTEGER
        },
        to_id: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.FLOAT
        },
        reason: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE
        },
        category: {
            type: Sequelize.STRING
        },
        reqsend: {
            type: Sequelize.INTEGER
        }
    })
};