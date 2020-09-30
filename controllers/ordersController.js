const OrderModel = require("../models/ordersModel");
const catchAsync = require("./../utils/catchAsync");

exports.getOrdersById = catchAsync(async (req, res) => {
    const tool = await OrderModel.findById(req.params.id);

    res.status(201).json({
        status: "success",

        data: {
            tool,
        },
    });
});

exports.createOrder = catchAsync(async (req, res) => {
    req.body.user = req.params.id;
    const order = req.body;
    console.log(order);
    const newOrder = await OrderModel.create(order);
    res.status(201).json({
        status: "success",
        data: {
            tool: newOrder,
        },
    });
});
exports.updateOrder = catchAsync(async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body);

    res.status(201).json({
        status: "success",
        data: {
            order,
        },
    });
});
exports.deleteOrder = catchAsync(async (req, res) => {
    const order = await OrderModel.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
    });
});
