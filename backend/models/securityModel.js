const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const securitySchema = mongoose.Schema(
    {
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        gate:{
            type:String
        }
    }
)


const Security = mongoose.model('Security',securitySchema);
module.exports = Security;