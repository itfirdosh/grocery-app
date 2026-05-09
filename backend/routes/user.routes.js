import express from "express";
import {
     registerUser, 
     loginUser, 
     logoutUser, 
     isAuthUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.get("/logout", authUser, logoutUser);
router.get("/is-auth", authUser, isAuthUser);

export default router;