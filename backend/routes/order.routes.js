// backend/routes/order.routes.js

import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";
import {
  getUserOrders,
  placeOrderCOD,
  getAllOrders,

} from "../controllers/order.controller.js";

const router = express.Router();

// ================= COD Order =================
// Frontend call: POST /api/order/cod
router.post("/cod", authUser, placeOrderCOD);

// ================= User Orders =================
// Frontend call: GET /api/order/user
router.get("/user", authUser, getUserOrders);

// ================= Seller Orders =================
// Frontend call: GET /api/order/seller
router.get("/seller", authSeller, getAllOrders);

export default router;