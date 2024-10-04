const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())
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
    const quizId = uuidv4(); // Generate a unique quiz ID
    const newQuiz = new Quiz({
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
app.get('/get-quiz/:id', (req, res) => {
const quizId = req.params.id;
Quiz.findOne({ quizId })
    .then((quiz) => {
    if (quiz) {
        res.send(quiz);
    } else {
        res.status(404).send({ message: 'Quiz not found' });
    }
    })
    .catch((error) => {
    console.error('Error retrieving quiz:', error);
    res.status(500).send({ message: 'Error retrieving quiz' });
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
            res1.send({userfound: true});
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
