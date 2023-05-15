const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

app.use(express.static('public'))

const port=3500;

mongoose.connect('mongodb://localhost:27017/host',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected Successfully")
}).catch(()=>{
    console.log(" Something Went Wrong")
})

const Register=require("./modals/register");

// app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})

app.get("/login",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
})

app.post("/register",async(req,res)=>{
    try{
        
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.cpassword);
        

        const password=req.body.password;
        const cpassword=req.body.cpassword;

        if(password===cpassword){
            
            const registerEmployee=new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword
            })

            const registered= await registerEmployee.save();
            // res.status(201).send("Data Saved Successfully")
            return res.redirect('signup_success.html')
        }
        else{
            // res.send("Password Are Not Matching! Please Enter Valid Password ");
            return res.redirect('notmatched.html')
        }


    }
    catch(error){
        res.status(400).send(error);
    }
})



app.post("/login",async(req,res)=>{
    try{

        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} ans password is ${password}`)
        
        const usermail=await Register.findOne({email:email});

        if(usermail.password === password){
            // res.status(201).send("LogIn Successfull");
            return res.redirect('greeting.html')
        }else{
            // res.send("password are not matching")
            return res.redirect('incorrect.html')
        }

    }
    catch(error){
        // res.status(400).send("Invalid Email Or Password");
        return res.redirect('invalidEP.html')
    }
})

app.listen(port,()=>{
    console.log(`Server Is Running At Port Number ${port}`)
})