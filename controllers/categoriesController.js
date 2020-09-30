const CategoriesModel = require("../models/categoriesModel");
const catchAsync = require("./../utils/catchAsync");

exports.getCategories = catchAsync(async (req, res) => {
    const categories = await CategoriesModel.find().populate("children");

    res.status(201).json({
        status: "success",
        results: categories.length,
        data: {
            categories,
        },
    });
});

exports.getCategoryById = catchAsync(async (req, res) => {
    const category = await CategoriesModel.findById(req.params.id).populate(
        "children"
    );
    res.status(201).json({
        status: "success",

        data: {
            category,
        },
    });
});
exports.getCategoryByIdAndUpdate = catchAsync(async (req, res) => {
    const category = await CategoriesModel.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.status(201).json({
        status: "success",

        data: {
            category,
        },
    });
});

exports.getRootCategories = catchAsync(async (req, res) => {
    const categories = await CategoriesModel.find({ type: "root" }).populate(
        "children"
    );

    res.status(201).json({
        status: "success",
        results: categories.length,
        data: {
            categories,
        },
    });
});
exports.createCategory = catchAsync(async (req, res) => {
    const category = req.body;
    console.log(req.body);
    const newCategory = await CategoriesModel.create(category);
    res.status(201).json({
        status: "success",
        data: {
            category: newCategory,
        },
    });
});

exports.deleteCategory = catchAsync(async (req, res) => {
    const category = await CategoriesModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: "success",
    });
});
