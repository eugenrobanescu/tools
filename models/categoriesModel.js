const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
    {
        name: String,
        img: {
            type: String,
            default: null,
        },
        type: String,
        parent: {
            type: mongoose.Schema.ObjectId,
            ref: "Categories",
            default: null,
        },
    },

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual --Dupa cum vezi,nu avem proprietatea children in schema,dar dupa ce am luat din db categoria dorita
// o sa ne adauge o proprietate children
categoriesSchema.virtual("children", {
    ref: ["Products", "Categories"],
    foreignField: "parent",
    localField: "_id",
});

const categoriesModel = mongoose.model("Categories", categoriesSchema);

module.exports = categoriesModel;
