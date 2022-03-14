const asyncHandler = require('express-async-handler');
const otplogin = require('../config/OtpVerify');
const Student = require('../models/studentModel');
const bcrypt = require("bcryptjs")


const registerStudent = asyncHandler(async (req,res)=>{
    // ask password, if password is that then alert them
    const {email,entryNumber,password} = req.body;

    const student = await Student.findByCredentials(entryNumber,password,res);

    if(student.passwordSet==true){
        res.status(400);
        throw new Error("you have already registered");
    }

    const otp = await otplogin(email);

    student.otp = otp;

    await student.save();

    res.status(200).json({});
})

const confirmOtp = asyncHandler(async(req,res)=>{
    const {email,entryNumber,password,otp} = req.body;
    const student = await Student.findOne({email});

    if(!student){
        res.status(400);
        throw new Error("Don't try to heck this site Loser");
    }

    if(student.otp!=otp){
        res.status(400);
        throw new Error("wrong otp");
    }

    res.status(201).json(student)
})

const passwordChange = asyncHandler(async(req,res)=>{
    const {email,entryNumber,password} = req.body;

    const student = await Student.findOne({entryNumber})

    if(!student){
        res.status(400);
        throw new Error('Unable to find such student');
    }

    const isMatch = await bcrypt.compare(password,student.password)

    if(!isMatch){
        student.password = password;
        student.passwordSet = true;
        const updatedStudent = await student.save();

        res.status(201).json(updatedStudent)
    }else{
        res.status(400);
        throw new Error("Change password to other than DOB");
    }
    
})

const loginStudent = asyncHandler(async(req,res)=>{
    const {entryNumber,password} = req.body;

    const student = await Student.findByCredentials(entryNumber,password,res);

    if(student.passwordSet==false){
        res.status(400);
        throw new Error("You should first register before logging in");
    }

    console.log(student);
    
    res.status(201).json(student);
})



module.exports = {registerStudent,confirmOtp,passwordChange,loginStudent};