import express from "express";
import {
  registerUser,
  loginUser,
  userData,
  updateData,
  verifyToken,
} from "../controller/authController.js";
import tokenData from "../utils/tokenData.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuserdata", tokenData, userData);
router.post("/updateuserdata", updateData);
router.post("/tokenverify", verifyToken);

export default router;
