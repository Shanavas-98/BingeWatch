const express = require("express");
const router=express.Router();
const {register, home, verifyOtp, login}=require('../controllers/userController')

router.get("/",home);
router.post("/register",register);
router.post("/verifyotp",verifyOtp);
router.post("/login",login);

module.exports = router;