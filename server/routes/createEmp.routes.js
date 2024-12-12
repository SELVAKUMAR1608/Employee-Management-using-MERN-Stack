const express = require("express");
const { createEmp, getEmp,updateEmp, deleteEmp } = require("../controllers/createEmp.controller");
const {verifyToken}=require("../controllers/login.controller")
let multer = require('multer');
let storage = multer.memoryStorage()
let  upload = multer({ storage :storage,limits:{fileSize:2e+7}});

const router = express.Router();
router.post("/employees",verifyToken, upload.fields([{name:'poster',maxCount:1}]),createEmp);
router.get("/employees",verifyToken, getEmp);
router.put("/employees/:empId",verifyToken, upload.fields([{name:'poster',maxCount:1}]),updateEmp)
router.delete("/employees/:empId",verifyToken, deleteEmp)

module.exports = router;