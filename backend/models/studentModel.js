const mongoose = require("mongoose")

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

studentSchema.statics.findByCredentials = async(email,password) => {
    const student = await Student.findOne({email})

    if(!student){
        throw new Error('Unable to find such student');
    }

    const isMatch = await bcrypt.compare(password,student.password)

    if(!isMatch){
        throw new Error("Stop illegal things!!!")
    }

    return student
}


const Student = mongoose.model('Student',studentSchema);
module.exports = Student;