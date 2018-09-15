const express = require("express");
const router = express.Router();

const checkauth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders')

// Handle incoming GET requests to /orders
router.get("/", checkauth, OrdersController.orders_get_all);

router.post("/", checkauth, OrdersController.orders_create_order);

router.get("/:orderId", checkauth, OrdersController.orders_get_order);

router.delete("/:orderId", checkauth, OrdersController.orders_delete_order);

module.exports = router;