const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
app.use(cors({ 
    origin:[ 'http://localhost:3000','https://stalwart-vacherin-9cef56.netlify.app'] ,
    methods: ['GET', 'POST'],
}));
app.use(express.json());
require('dotenv').config();
console.log(process.env.user);
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.u02oy.mongodb.net/quiz`).then(()=>{
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
let answersSchema=new mongoose.Schema({
    id:String,
    answers:[],
    
});
let answermodel=mongoose.model("answer",answersSchema);
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
  let submitedUsers = new mongoose.Schema({
    userid: String,
    quizid: String,
    data:mongoose.Schema.Types.Mixed
});
let submitedUsersmodel = mongoose.model("submitanswers", submitedUsers);
app.post("/viewall",(req,res)=>{
    let quizid=req.body.quizid;
    console.log(req.body);
    submitedUsersmodel.find({quizid:quizid},{_id:0,data:1}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send();
    })


})
app.post("/user-submit-answer", (req, res) => {
    let quiz = req.body.quizId;
    // console.log(req.body);

    let x = jwt.verify(req.body.userid, 'shhhhh');
    let userid=x.username;

    // Extract the length of the username from the initial digits of the string
    let len = "";
    let i = 1;

    // Iterate through the quiz string until a non-digit is found (determining the length of the username)
    while (i < quiz.length && quiz[i] >= '1' && quiz[i] <= '9') {
        len += quiz[i];
        i++;
    }

    // Parse the length into a number and extract the username
    let lengthOfUsername = parseInt(len);  // Convert the extracted length to an integer
    let username = quiz.substring(i, i + lengthOfUsername);  // Extract username based on length
    let quizId = quiz.substring(i + lengthOfUsername);  // Extract the rest as quiz ID

    // Extract answers from request
    let answers = req.body.answers;
    let arranswer = [];
    for (let key in answers) {
        arranswer.push(answers[key]);
    }

    // Step 1: Check if the user has already submitted answers for this quiz
    submitedUsersmodel.findOne({ userid: userid, quizid: quizId }).then((existingSubmission) => {
        if (existingSubmission) {
            // If entry is found, the user has already submitted this quiz
            return res.status(400).send({ message: "You have already submitted this quiz." });
        } else {
            // Step 2: If no existing entry is found, process the answers and store the submission

            // Query the database to get the correct answers for the given quiz ID
            answermodel.findOne({ id: quizId }, { _id: 0, id: 0 }).then((result) => {
                if (result) {
                    let arr = result.answers;
                    let count = 0;

                    // Use arranswer.length instead of answers.length
                    for (let i = 0; i < arranswer.length; i++) {
                        if (arr[i] === arranswer[i]) {
                            count++;
                        }
                    }
                    let data={
                        userFields:req.body.userFields,
                        marks:count
                    }
                    // Store this submission in the submitted users model
                    let newSubmission = new submitedUsersmodel({
                        userid: userid,
                        quizid: quizId,
                        data:data
                    });
                    
                    newSubmission.save().then(() => {
                        // Send response with the correct answers count
                        res.send({ correctAnswers: count, message: "Quiz successfully submitted!" });
                    }).catch((saveErr) => {
                        console.error("Error saving submission:", saveErr);
                        res.status(500).send("Error saving quiz submission.");
                    });
                } else {
                    console.error("No answers found for the given quiz ID");
                    res.status(404).send("Quiz answers not found.");
                }
            }).catch((error) => {
                console.error("Error fetching answers:", error);
                res.status(500).send("Error fetching quiz data.");
            });
        }
    }).catch((err) => {
        console.error("Error checking submission status:", err);
        res.status(500).send("Error checking submission status.");
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
    // console.log("hi");
    let quiz = req.params.quiz;  // Extract the quiz ID from the route parameter
    let Userusername = jwt.verify(req.query.username,"shhhhh").username;  // Retrieve the 'username' query paramete
    
    // Extract the length of the username from the initial digits of the string
    let len = "";
    let i = 1;

    // Iterate through the quiz string until a non-digit is found (determining the length of the username)
    while (i < quiz.length && quiz[i] >= '1' && quiz[i] <= '9') {
        len += quiz[i];
        i++;
    }

    // console.log(`Length of the username: ${len}`);

    // Parse the length into a number and extract the username
    let lengthOfUsername = parseInt(len);  // Convert the extracted length to an integer
    let username = quiz.substring(i, i + lengthOfUsername);  // Extract username based on length
    let quizId = quiz.substring(i + lengthOfUsername);  // Extract the rest as quiz ID


    // console.log(`Username: ${Userusername}, Quiz ID: ${quizId}`);
    submitedUsersmodel.find({userid:Userusername,quizid:quizId}).then((result1)=>{
        if(result1.length>0){
            console.log("ok");
            return res.status(400).send({ message: "You have already submitted this quiz." });
        }
        else{
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
        }
    }).catch((err)=>{
        res.status(500).send("Error fetching quiz data: " + error);
    })
    // Query the database with the extracted username

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
            res1.status(500).send("userid found !");
        }
        else{
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
                res1.send({registration: false})
            })
        }
    })
    
})


app.post("/submit-quiz",(req,res)=>{
    console.log(req.body);
    let arr=[];
    let answers=req.body.answers;
    for (let key in answers) {
        
            value = answers[key];
            arr.push(value);
        
    }
    // let quizid=req.body.quizId;
    answermodel.find({id:req.body.quizId}).then((response)=>{
        if(response.length>0){
            
            answermodel.updateOne({id:req.body.quizId},{$set:{answers:arr}}).then(()=>{
                console.log("hwif");
                res.send("saved");
            }).catch((err)=>{
                console.log(err);
            });
            
        }
        else{
            let x=new answermodel({
                id:req.body.quizId,
                answers:arr
            })
            x.save().then(()=>{
                console.log("saved");
                res.send("saved");
            })
            .catch((error) => {
                res.status(500).send("Error fetching quiz data: " + error);
            });
        }
    })
    
    
})
app.get("/",(req,res)=>{
    res.send("hi");
})
app.listen(3001, ()=>{
    console.log("Listening at port 3001...")
})
