const db = require('../conn')
const mongoose = require('../conn').mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,        
    }
});
// Password Hashing before saving to the database
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
