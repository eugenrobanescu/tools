const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    parent: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Categories",
        },
    ],
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
