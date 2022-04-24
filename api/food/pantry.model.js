const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize) {
    const attributes = {
        foodId: {type: DataTypes.STRING, allowNull: false},
        quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: "1"},
        product_name: {type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.STRING, allowNull: false},
        food_group: {type: DataTypes.STRING},

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false
    };

    return sequelize.define('pantry', attributes, options);
}