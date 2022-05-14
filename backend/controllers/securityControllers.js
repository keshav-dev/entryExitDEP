const expressAsyncHandler  = require('express-async-handler');
const Entry = require("../models/entryModel");
const Security = require("../models/securityModel");
const Student = require("../models/studentModel");


const loginSecurity = expressAsyncHandler(async(req,res)=>{
    const {email,password,gate} = req.body;

    const security = await Security.findOne({email});

    if(!security){
        res.status(400);
        throw new Error("Such security does not exist");
    }

    if(security.password!==password){
        res.status(400);
        throw new Error("Incorrect Password");
    }

    security.gate = gate;
    await security.save();

    // console.log(student);
    
    res.status(201).json(security);
})

const scanStudent = expressAsyncHandler(async(req,res)=> {
    const {studentId,securityId,status,gate} = req.body;
    // console.log(studentId, securityId, status, gate);

    const entry = new Entry({studentId,securityId,status,gate});
    await entry.save();

    const student = await Student.findOne({_id:studentId})

    if(student.status=='outside'){
        student.status = 'inside';
        student.history.push({date:new Date(),entry:'You entered the campus'})
    }else{
        student.status = 'outside';
        student.history.push({date:new Date(),entry:'You exited the campus'})

    }


    student.lastentry = new Date();

    await student.save();

    console.log(student);

    res.status(201).json(student);

})

const getHistory = expressAsyncHandler(async(req,res)=> {
    const {securityId} = req.body;
    // console.log(studentId, securityId, status, gate);

    const entries = await Entry.find({securityId});
    console.log(securityId);

    const responses = await Promise.all(entries.map(async(entry)=>{
        const student = await Student.findOne({_id:entry.studentId});
        const response = {};
        response.name = student.name;
        response.date = entry.createdAt
        response.status = entry.status;
        // console.log(student.name);
        return response;
    }))
    // await entry.save();

    // const student = await Student.findOne({_id:studentId})

    // if(student.status=='outside'){
    //     student.status = 'inside';
    //     student.history.push({date:new Date(),entry:'You entered the campus'})
    // }else{
    //     student.status = 'outside';
    //     student.history.push({date:new Date(),entry:'You exited the campus'})

    // }
    console.log(responses);


    // student.lastentry = new Date();

    // await student.save();

    // console.log(student);

    res.status(201).json(responses);

}) 

module.exports = {loginSecurity,scanStudent,getHistory};
