const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    }

})

const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;