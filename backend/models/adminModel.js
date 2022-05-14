const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const adminSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        kind:{
            type:String,
            required:true
        },
        reports:{
            type:Array,
            default:[]
        }
    }
)


const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;