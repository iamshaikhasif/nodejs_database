const mongoose = require("mongoose");
const validator = require("validator");


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: 1
    },
    email:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid Email Address`)
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min: 10,
    },
    class:{
        type:String,
        required:true,
        minLength: 2
    },
    subject:{
        type:String,
        required:true,
        minLength:1
    },
    userId:{
        type:String,
        required: true,
        minLength:1
    }
})


const Students = mongoose.model("Student", studentSchema);

module.exports = Students;