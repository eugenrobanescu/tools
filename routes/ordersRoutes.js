const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

// router
//     .route("/")

//     .post(productsController.createOrder);

router
    .route("/:id")
    .post(ordersController.createOrder)
    .get(ordersController.getOrdersById)
    .patch(ordersController.updateOrder)
    .delete(ordersController.deleteOrder);
module.exports = router;
