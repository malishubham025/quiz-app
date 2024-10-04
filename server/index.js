const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/quiz").then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
const adminSchema=new mongoose.Schema({
    username:String,
    password:String
})
const Adminmodel=mongoose.model("admin",adminSchema);

const userSchema=new mongoose.Schema({
    username:String,
    password:String
})
const Usermodel=mongoose.model("user",userSchema);
app.use(express.json())
app.use(cors())



app.post('/login', (req, res1) =>{
    const name = req.body.name;
    const password = req.body.password;

    Usermodel.find({username:name,password:password}).then((res)=>{
        if(res.length>0){
            res1.send({userfound: true});
        }
        else{
            res1.send({userfound: false});
        }
    })
})

app.post('/register', (req, res1)=>{
    const name = req.body.name;
    const password = req.body.password;
    Usermodel.find({username:name,password:password}).then((res)=>{
        if(res.length>0){
            res1.send({registration: false});
        }
    })
    const user=new Usermodel({
        username:name,
        password:password
    })
    user.save().then(()=>{
        res1.send({registration: true})
    })
    .catch((err)=>{
        console.log(err);
        res.send({registration: false})
    })
})

app.listen(3001, ()=>{
    console.log("Listening at port 3001...")
})
