const mongoose = require("mongoose");
const slugify = require("slugify");
const catchAsync = require("./../utils/catchAsync");
const categoriesSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
        img: {
            type: String,
            default: null,
        },
        type: [String],
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

categoriesSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true, replacement: "-" });
    console.log(this.slug);
    next();
});

const categoriesModel = mongoose.model("Categories", categoriesSchema);

module.exports = categoriesModel;
