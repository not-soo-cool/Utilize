import express from 'express'
import { createBulkOrder, createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from '../controllers/orderController.js';

export const orderRouter = express.Router();

orderRouter.route("/create").post(createOrder);

orderRouter.route("/bulk/create").post(createBulkOrder)

orderRouter.route("/get/all").get(getAllOrders)

orderRouter.route("/get/:id").get(getOrder)

orderRouter.route("/update/:id").put(updateOrder)

orderRouter.route("/delete/:id").delete(deleteOrder)