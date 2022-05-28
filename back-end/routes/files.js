const express = require("express");
const router = express.Router();
const filesController=require("../controllers").files;

function middleware (req, res, next) {
    console.log('I run before the controller action!')
    console.log(req.params);
    next()
  }

router.get('/getFiles/:userId', middleware, filesController.getFiles);
router.get('/getFilesByName/:name', filesController.deletefilebyName);
router.get('/getFilesByCategory/:category', filesController.getfilesByCategory);
router.get('/downloadFile/:fileId/:userId', filesController.downloadFile);
router.get('/downloadFileName/:fileId/:userId', filesController.downloadFileName);

router.post('/addFile', filesController.addFile);

router.delete('/deleteFilebyId/:fileId/:userId',middleware, filesController.deletefilebyId);
router.delete('/deleteFilebyName/:name', filesController.deletefilebyName);

module.exports=router;