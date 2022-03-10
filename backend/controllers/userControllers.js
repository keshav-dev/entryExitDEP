const asyncHandler = require('express-async-handler');
const otplogin = require('../config/OtpVerify');
const Student = require('../models/studentModel');


const registerStudent = asyncHandler(async (req,res,next)=>{
    // ask password, if password is that then alert them
    const {email,entryNumber,password} = req.body;
    const student = await Student.findOne({email});

    if(!student){
        res.status(400);
        //console.log("what is this");
        const error = new Error("You are not valid student");
        next(error);
        return;
    }

    if(password.toLowerCase=="iitropar"){
        res.status(400);
        const error = new Error("You should change your password to something else");
        next(error);
        return;
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

    student.password = password;
    const updatedStudent = await student.save();

    res.status(201).json(updatedStudent)
})



module.exports = {registerStudent,confirmOtp};