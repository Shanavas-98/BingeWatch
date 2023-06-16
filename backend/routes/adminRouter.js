const express = require("express");
const router=express.Router();
const {dashboard, login, adminAuth}=require("../controllers/adminController");

router.get("/dashboard",dashboard);
router.post("/login",login);
router.get("/auth-admin",adminAuth);

module.exports = router;