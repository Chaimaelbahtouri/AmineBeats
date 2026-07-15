const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema ({
    email: {
        type : String,
        unique : true,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})


UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', UserSchema)
module.exports = User