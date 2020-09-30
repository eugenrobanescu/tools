const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Products",
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;
