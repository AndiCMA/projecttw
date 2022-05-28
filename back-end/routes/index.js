const express = require("express");
const router = express.Router();

const files=require("./files");
const users=require("./users");
const testWay= require("./testWay")

router.use("/",users,files,testWay);
module.exports=router;