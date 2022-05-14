const expressAsyncHandler  = require('express-async-handler');
const Admin = require('../models/adminModel');
const Student = require('../models/studentModel');

// console.log(__dirname);
const csv = require('csv-parser');
const fs = require('fs');

const loginAdmin = expressAsyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const admin = await Admin.findOne({email});

    if(!admin){
        res.status(400);
        throw new Error("Error! The user doesn't exist.");
    }

    if(admin.password!==password){
        res.status(400);
        throw new Error("Incorrect Password");
    }
    
    res.status(201).json(admin);
})

const isInside = (histElem) => {
    if(histElem.entry==="You exited the campus")return false;
    return true;
}

const checkStatus = (history,beginTime,finishTime) => {
    let n  = history.length;
    let i = n-1;
    while(i>=0 && history[i].date.getTime()>beginTime){
        i--;
    }
    if(i<0)return false;
    if(i==n-1){
        return isInside(history[i]);
    }
    if(history[i+1].date.getTime()<finishTime)return false;
    return isInside(history[i]);
}

const getStudentsIn = expressAsyncHandler(async(req,res)=>{
    // const {date,hostel} = req.body;
    let {beginTime,finishTime,hostel,status} = req.body;
    let query = {};
    if(hostel){
        query.hostel = hostel;
    }
    // if(status){
    //     query.status = status;
    // }
    const students = await Student.find(query);

    beginTime = new Date(beginTime);
    beginTime = beginTime.getTime();

    finishTime = new Date(finishTime);
    finishTime = finishTime.getTime();

    let response = [];
    let response2 = [];
    for(let student of students){
        if(checkStatus(student.history,beginTime,finishTime)){
            response.push(student);
        }else{
            response2.push(student);
        }
    }
    if(status=='outside'){
        return res.status(200).json(response2);
    }else{
        res.status(200).json(response);
    }

    
})

const saveStudent = async(student)=> {
    student.password = student.DOB;
    student.passwordSet = false;
    student.status = 'outside';
    student = await Student.create(student);
    await student.save();
}

const uploadStudents = expressAsyncHandler(async(req,res)=>{
    // return res.status(200).json({msg:'No file uploaded'});
    console.log(req.body.file);
    if(req.files===null){
        // console.log("HERE1");
        return res.status(400).json({msg:'No file uploaded'});
    }
    // console.log("HERE2");

    const file = req.files.file;
    console.log(file);
    file.mv(`${__dirname}/${file.name}`,err => {
        if(err){
            console.error(err);
            res.status(500).send(err);
        }

        fs.createReadStream(`${__dirname}/${file.name}`)
            .pipe(csv({})).on('data',async(data)=>{
                console.log(data);
                await saveStudent(data);
            })
    })
})

const saveReports = expressAsyncHandler(async(req,res)=>{
    const {studentId,entry,previousEntry,currentEntry} = req.body;
    const admin = await Admin.findOne({});
    admin.reports.push({studentId,entry,previousEntry,currentEntry});
    await admin.save();
    console.log(admin);
    res.status(201).json({msg:"Successfully Done!"});
})

const getReports = expressAsyncHandler(async(req,res)=>{
    const admin = await Admin.findOne({});
    res.status(200).json(admin.reports);
})

const approveReport = expressAsyncHandler(async(req,res)=>{
    const {index} = req.body;
    console.log(index);
    const admin = await Admin.findOne({});
    const {studentId,entry,previousEntry,currentEntry} = admin.reports[index];
    const student = await Student.findById(studentId);
    student[entry] = currentEntry;
    console.log(student);
    await student.save();
    let tempArray = admin.reports.slice(index+1,admin.reports.length);
    admin.reports = admin.reports.slice(0,index);
    for(const report of tempArray){
        admin.reports.push(report)
    }
    // admin.reports.push(tempArray);
    await admin.save();
    res.status(201).json({msg:"Successfully Done!"});
})

const denyReport = expressAsyncHandler(async(req,res)=>{
    const {index} = req.body;
    const admin = await Admin.findOne({});
    let tempArray = admin.reports.slice(index+1,admin.reports.length);
    admin.reports = admin.reports.slice(0,index);
    for(const report of tempArray){
        admin.reports.push(report)
    }
    await admin.save();
    res.status(201).json({msg:"Successfully Done!"});
})


module.exports = {loginAdmin,getStudentsIn,uploadStudents,saveReports,getReports,approveReport,denyReport};