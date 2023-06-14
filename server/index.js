require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const {User} = require("./models/user");


mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true});

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    post: {
          type: String,
          required: true
    }
})


const diarySchema = new mongoose.Schema({
    emailId: {
      type: String,
      required: true,
      unique: true
    },
    diary: [postSchema]
})

const postModel = mongoose.model("post",postSchema);
const diaryModel = mongoose.model("diary",diarySchema);



app.post("/addpost", async (req,res)=>{
    const post = new postModel({
        title: req.body.title,
        post: req.body.post
    })
    await post.save();

    const d = await diaryModel.findOne({emailId:req.body.emailId});
    
    if(d) {
        diaryModel.updateOne({emailId:req.body.emailId},{$push:{diary:post}})
        .then(function(){
            console.log("diary added !");
            res.status(200).send({message:"Diary Added Successfully"});
        })
        .catch(function(err){
            console.log(err);
            res.status(400).send({message:"Couldn't Add Diary"});
        })
    } 
    else {
        const diaryPost = new diaryModel({
            emailId: req.body.emailId,
            diary: post
        })
        
        await diaryPost.save();
        res.status(200).send({message:"Diary Added Successfully"});
    }
})


app.get("/diary/:id",async function(req,res){
    const id = req.params.id;
    const user = await User.findOne({_id:id});
    if(user) {
        const userEmail = user.email;
        const diaryData = await diaryModel.findOne({emailId:userEmail})
        if(diaryData) {
            const diaryDetails = {
                firstName: user.firstName,
                diary: diaryData.diary
            }
            res.json(diaryDetails);
        }
        else {
            const diaryDetails = {
                firstName: user.firstName,
                diary: []
            }
            res.json(diaryDetails);
        }
    } else {
        res.status(400).send({message:"No Users Found !!"});
    }
})


app.get("/getAllUsers",async (req,res)=>{

    await User.find({})
    .then(function(foundUsers){
        res.json(foundUsers);
    })
    .catch(function(err){
        res.status(400).send({message:"No Users Found !!"});
    })

});



app.get("/getUser/:id",async (req,res)=>{
    const id = req.params.id;
    await User.findOne({_id:id})
    .then(function(foundUser){
        const email = foundUser.email;
        res.json(email);
    })
    .catch(function(err){
        res.status(400).send({message:"No User Found !!"});
    })
})


app.get("/:email",async (req,res)=>{
    const email = req.params.email;
    const user = await User.findOne({email:email});
    res.json(user);
})


app.get("/getposts/:email",async (req,res)=>{
    const email = req.params.email;
    const diaries = await diaryModel.findOne({emailId:email})
    res.json(diaries);
})

app.get("/getuserdiaries/:id",async (req,res)=>{
    const id = req.params.id;
    await User.findOne({_id:id})
    .then(function(foundUser){
        res.json(foundUser);
    })
    .catch(function(err){
        res.status(400).send({message:"No User Found !!"});
    })
})

app.delete("/deleteuser/:id",async (req,res) => {
    const id = req.params.id;
    
    await User.findOne({_id:id})
    .then(async function(foundUser){
        const email = foundUser.email;
        await diaryModel.deleteOne({emailId: email})
        .then(function(){
            console.log("Diary Deleted");
        })
        .catch(function(error){
            console.log(error);
        })
    })
    .catch(function(error){
        console.log(error);
    })

    await User.deleteOne({_id:id})
    .then(function(){
        res.status(200).send({message:"User Deleted Successfully"});
    })
    .catch(function(error){
        res.status(500).send({message:"Internal Server Error"});
    })

})


const port = process.env.PORT || 8080;
app.listen(port,function(){
    console.log(`Listening on port: ${port}`);
})
