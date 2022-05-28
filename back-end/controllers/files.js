const fileDB=require("../models").Files;
const sequelize=require("../models/index").sequelize;
const { Op } = require("sequelize");
const path = require("path");
const fs = require('fs');

const dropbox = require("../dropbox/index");

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function format(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });
    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}

function upload(req){
    console.log("Moving started");
    let filForm = req.files.file;
    let ext = filForm.name.split('.').pop()
    filForm.name = makeid(10) + "." + ext;
    filForm.mv('./uploads/' + filForm.name, err => {
    if (err) {
        return null;
        console.log(err);
        }
        let dropboxed = dropbox.upload(filForm.name);
    });
    console.log("Moved completed");
    return filForm.name;
}

const controller={
    addFile: async(req,res)=>{

        let moved = upload(req);
        console.log(req.body);

        console.log("Add to db");
        try {
            if ( req.body.name &&
                req.body.category &&
                req.body.id &&
                moved) 
            {
                let date = format(new Date(), 'yyyy-MM-dd');
                var insert ={
                    name: req.body.name,
                    category: req.body.category,
                    userId: req.body.id,
                    data: date,
                    FileReff:moved
                };
                let file = await fileDB.create(insert);
                res.status(201).send({ message: "Created file successfully" });
            } 
            else{
                res.status(400).send({message: "nu sunt date",reqbody:req.body});
                console.log("There is no data")
            } 
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: `${err}` });
        }
    },

    downloadFile: async(req,res)=>{
        try {
            const files = await fileDB.findAll({where:{FileId:req.params.fileId,userId:req.params.userId}});
            if (files) {
                fileName = files[0].dataValues.FileReff;
                let pathFile = path.join(__dirname, '../downloads',fileName);
                dropboxedDownload = await dropbox.download(fileName);
                res.sendFile(pathFile, function (err) {
                if (err) {
                    console.log('Sent error:', err);
                } else {
                    console.log('Sent:', fileName);
                    //fs.unlinkSync(pathFile);
                }
            });
        }else{
            res.status(502).send("Nu aveti acces la fisier");
        }
        }catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    },
    downloadFileName: async(req,res)=>{
        try {
            const files = await fileDB.findAll({where:{FileId:req.params.fileId,userId:req.params.userId}});
            if (files) {
                //console.log(files);
                fileName = files[0].dataValues.FileReff;
                let ext = fileName.split('.').pop();
                let name = files[0].dataValues.name + "." +ext;
                return res.status(200).send(name);
            }
        }catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    },

    getFiles:async(req,res)=>{
        console.log("get files called");
        try {
            const files = await fileDB.findAll();
            if (files) {
                return res.status(200).send(files);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    },

    getfilesByCategory:async(req,res)=>{
        try {
            const files = await fileDB.findAll({where:{category:req.params.category,id:req.params.userId}});
            if (files) {
                return res.status(200).send(files);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    deletefilebyName: async(req,res)=>{
        try {
            let file = await fileDB.findAll({ where: { name: req.params.name } });
            if (file == null) {
                res.status(404).send({ message: "file not found" });
            }else {
                fileDB.destroy({where:{name: req.params.name}});
                res.status(201).send({message: "file deleted"});
            } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    deletefilebyId: async(req,res)=>{
        try {
            if (req.params.fileId>0) {
                let file = await fileDB.findAll({ where: { Fileid: req.params.fileId , userId : req.params.userId } });
                if (file == null) {
                    res.status(404).send({ message: "file not found" });
                }else {
                    fileDB.destroy({where:{Fileid: req.params.fileId, userId : req.params.userId}});
                    res.status(201).send({message: "file deleted"});
                }
            } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
}

module.exports = controller;