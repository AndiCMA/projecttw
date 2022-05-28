const express = require("express");
const router = express.Router();
const usersController=require("../controllers").users;

router.get('/getUsers', usersController.getUsers);
router.get('/getUserById/:userId', usersController.getUserById);
router.post('/addUser',usersController.addUser);
router.post('/login', usersController.login);

module.exports=router;