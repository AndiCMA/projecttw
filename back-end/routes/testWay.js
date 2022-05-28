const express = require("express");
const router = express.Router();
const testController=require("../controllers").testWay;

router.get('/test', testController.main);
router.get('/test/:id', testController.main);

module.exports=router;