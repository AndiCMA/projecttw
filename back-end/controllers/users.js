const UserDB=require("../models").Users;
const controller={
    login: (req, res) =>{
        let connected = false;
        console.log(req.body);
        UserDB.findOne({ where: { email: req.body.email , password: req.body.parola} })
        .then((user)=>{
        connected = true;
        if(user){
            res.status(200).send({
            message: "Autentificat cu succes",
            login: true,
            user
            });
        }else{
            res.status(401).send({
            message: "Credentiale gresite",
            });
        }
        })
    },

    addUser: async (req, res) => {
        try {
            if (
                req.body.username &&
                req.body.email &&
                req.body.password
            ) {
                var user = await UserDB.findOne({where: { email: req.body.email },});
                if (user !== null) {
                    res.status(409).send({ message: "Exista un cont cu acest email" });
                } else {
                    let user = await UserDB.create(req.body);
                    res.status(201).send({ message: "Cont creat cu succes" });
                }
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getUserById: async(req,res) =>{
        try {
            const user = await UserDB.findOne({where:{id:req.params.userId}});
          if (user) {
                return res.status(200).send(user);
          } else {
                return res.status(404).send({ message: "Not found" });
          }
      } catch (err) {
            return res.status(500).send(err);
      }
    },

    getUsers: async(req,res) =>{
        try {
            const user = await UserDB.findAll();
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports=controller;