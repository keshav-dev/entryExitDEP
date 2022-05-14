const mongoose = require("mongoose")
const asyncHandler = require('express-async-handler');

const bcrypt = require("bcryptjs")

const studentSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        entryNumber:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        hostel:{
            type:String,
            required: true
        },
        room:{
            type:String,
            required: true
        },
        phone:{
            type:String,
            required: true
        },
        parentPhone:{
            type:String,
            required: true
        },
        address:{
            type:String,
            required: true
        },
        passwordSet:{
            type:Boolean,
            required:true
        },
        otp:{
            type:String,
            required:false
        },
        DOB:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        lastentry:{
            type:Date
        },
        history:{
            type:Array,
            default:[]
        }
    }
)

studentSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

studentSchema.statics.findByCredentials = async(entryNumber,password,res) => {
    const student = await Student.findOne({entryNumber})

    if(!student){
        res.status(400);
        throw new Error('Unable to find such student');
    }

    const isMatch = await bcrypt.compare(password,student.password)

    if(!isMatch){
        res.status(400);
        throw new Error("Password is wrong!!!")
    }

    return student
}


const Student = mongoose.model('Student',studentSchema);
module.exports = Student;