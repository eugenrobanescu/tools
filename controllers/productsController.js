const ProductModel = require("../models/productsModel");
const catchAsync = require("./../utils/catchAsync");

exports.getProductById = catchAsync(async (req, res) => {
    const tool = await ProductModel.findById(req.params.id);

    res.status(201).json({
        status: "success",

        data: {
            tool,
        },
    });
});

exports.createProduct = catchAsync(async (req, res) => {
    const tool = req.body;
    console.log(req.body);
    const newTool = await ProductModel.create(tool);
    res.status(201).json({
        status: "success",
        data: {
            tool: newTool,
        },
    });
});
exports.updateProduct = catchAsync(async (req, res) => {
    const tool = await ProductModel.findByIdAndUpdate(req.params.id, req.body);

    res.status(201).json({
        status: "success",

        data: {
            tool,
        },
    });
});
exports.deleteProduct = catchAsync(async (req, res) => {
    const tool = await ProductModel.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
    });
});
