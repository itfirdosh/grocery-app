import express from "express";
import { sellerlogin, sellerLogout, isAuthSeller } from "../controllers/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";


const router = express.Router();

router.post ("/login", sellerlogin);
router.get ("/is-auth", authSeller, isAuthSeller);
router.get ("/logout", authSeller, sellerLogout);

export default router;