const express = require("express");
const router = express.Router();
const {
  RegisterController,
  GetOtp,
  ResendOtp,
  singleuser,
  LoginController,
} = require("./User.controller");
const verifyToken = require("../../Middleware/Authentication.Middleware");

router.post("/register", RegisterController);
router.post("/getotp", GetOtp);
router.post("/resendotp", ResendOtp);
router.get("/singleuser", verifyToken, singleuser); // Protected route
router.post("/resendotp", ResendOtp);
router.post("/login", LoginController);
module.exports = router;
