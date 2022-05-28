
const sequelize=require("../models/index").sequelize;
const { Op } = require("sequelize");
const dropbox = require("../dropbox/index");
const path = require("path");


const controller={
    main : async(req,res)=>{
        let pathFile = path.join(__dirname, '../downloads',"calf-raises_orig.gif");
        console.log(pathFile);
        
        res.sendFile(pathFile);

        console.log(req.params);
        let a="received";
    }
    
}

module.exports = controller;