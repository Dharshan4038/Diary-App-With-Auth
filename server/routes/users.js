const router = require("express").Router();
const { User,validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


router.post("/",async (req,res)=>{
    try {
        const {error} = validate(req.body);
        if(error) 
            return res.status(400).send({message: error.details[0].message});

        let user = await User.findOne({email: req.body.email});
        
        if(user)
            return res.status.send(409).send({message:"User with given email already exist !"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        
        user = await new User({...req.body,password:hashPassword}).save();

        const token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        });
        await token.save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify Email",url);
        res.status(201).send({message:"An Email sent your account please verify"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
});


router.get("/:id/verify/:token/",async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
          return res.status(400).send({ message: "Invalid link" });
        }
    
        const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
        });
        
        if (!token) {
          return res.status(400).send({ message: "Invalid link" });
        }
        
        await User.updateOne({_id:token.userId},{$set:{verified:true}});
        await Token.findByIdAndRemove(token._id);
        res.status(200).send({ message: "Email verified successfully" });
      } 
      catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
});


module.exports = router;