const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
    name: String,
    slug: String,
    quantity: Number,
    price: Number,
    parent: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Categories",
        },
    ],
});

productSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true, replacement: "-" });
    console.log(this.slug);
    next();
});
const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
