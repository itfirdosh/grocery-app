import express from "express";

import { upload } from "../config/multer.js";
import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, getProducts, getProductById, changeStock, deleteProductById } from "../controllers/product.controller.js";

const router = express.Router();
router.post("/add-product",authSeller,  upload.array("image"),  addProduct);
router.get("/list",getProducts);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);
router.post("/delete", authSeller, deleteProductById);




export default router;