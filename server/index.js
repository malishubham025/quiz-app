const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
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
// Schema for individual user fields (like name, email)
const userFieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }
});

// Schema for quiz questions and their options
const questionSchema = new mongoose.Schema({
question: { type: String, required: true },
options: { type: [String], required: true }
});

// Main quiz schema
const quizSchema = new mongoose.Schema({
userid:{ type: String, required: true },
quizId: { type: String, required: true, unique: true },
userFields: [userFieldSchema],  // Array of userFieldSchema
questions: [questionSchema],    // Array of questionSchema
createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const Quiz = mongoose.model('Quiz', quizSchema);
app.post('/save-quiz', (req, res) => {
    const quizData = req.body;
    console.log(quizData);
    let token=jwt.verify(quizData.id,'shhhhh');
    let userid=token.username;
    console.log(userid);
    const quizId = uuidv4(); // Generate a unique quiz ID
    const newQuiz = new Quiz({
      userid,
      quizId,
      userFields: quizData.userFields,
      questions: quizData.questions
    });
  
    newQuiz.save()
      .then((savedQuiz) => {
        // Send the response after the quiz is successfully saved
        res.send({ success: true, id: savedQuiz.quizId });
      })
      .catch((error) => {
        console.error('Error saving quiz:', error);
        res.status(500).send({ success: false, message: 'Error saving quiz' });
      });
  });
  
// Route to get a quiz by ID
app.get('/get-quiz', (req, res) => {
let id=req.query.id;
// console.log(id);
let token=jwt.verify(id,'shhhhh');
let username=token.username;
Quiz.find({userid:username},{_id:0}).then((result)=>{
    if(result.length>0){
        // result.uname=username;
        res.send({"responce":result,"uname":username});
    }
    else{
        res.send(null); 
    }
})

});

app.get('/users-get-quiz/:quiz', (req, res) => {
    console.log("hi");
    let quiz = req.params.quiz;  // Correct way to access the 'quiz' parameter
    console.log(quiz);

    // Extract the length of the username from the initial digits of the string
    let len = "";
    let i = 1;

    // Iterate through the quiz string until a non-digit is found (determining the length of the username)
    while (i < quiz.length && quiz[i] >= '1' && quiz[i] <= '9') {
        len += quiz[i];
        i++;
    }

    console.log(`Length of the username: ${len}`);

    // Parse the length into a number and extract the username
    let lengthOfUsername = parseInt(len);  // Convert the extracted length to an integer
    let username = quiz.substring(i, i + lengthOfUsername);  // Extract username based on length
    let quizId = quiz.substring(i + lengthOfUsername);  // Extract the rest as quiz ID

    // console.log(`Username: ${username}, Quiz ID: ${quizId}`);

    // Query the database with the extracted username
    Quiz.find({ userid: username,quizId: quizId}, { _id: 0 }).then((result) => {
        if (result.length > 0) {
            // console.log(result);
            res.send(result);
        } else {
            res.send(null);
        }
    }).catch((error) => {
        res.status(500).send("Error fetching quiz data: " + error);
    });
});



const userSchema=new mongoose.Schema({
    username:String,
    password:String
})
const Usermodel=mongoose.model("user",userSchema);






app.post('/login', (req, res1) =>{
    const name = req.body.name;
    const password = req.body.password;

    Usermodel.find({username:name,password:password}).then((res)=>{
        if(res.length>0){
            var token = jwt.sign({username:name,password:password}, 'shhhhh');
            res1.send({userfound: true,id:token});
        }
        else{
            res1.send({userfound: false});
        }
    })
})
app.post('/save-quiz', (req, res1) =>{
    console.log(req.body);
    res1.send({userfound: true});
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
        var token = jwt.sign({username:name,password:password}, 'shhhhh');
        // res1.send({userfound: true,id:token});
        res1.send({registration: true,id:token})
    })
    .catch((err)=>{
        console.log(err);
        res.send({registration: false})
    })
})

app.listen(3001, ()=>{
    console.log("Listening at port 3001...")
})
