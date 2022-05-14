const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const entrySchema = mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.ObjectId, ref: 'Student', required: true },
        securityId: { type: mongoose.Schema.ObjectId, ref: 'Security', required: true },
        status: { type:String, required: true },
        gate: {type:String,required:true}
    },
    { timestamps: true }
)

const Entry = mongoose.model('Entry',entrySchema);
module.exports = Entry;