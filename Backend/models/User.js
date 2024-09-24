const mongosse = require('mongoose');

const userSchema = new mongoose.Schema({

    username : {
        type:String,
        trim:true,
        required:true
    },
    password :  {
        type:String,
        trim:true,
        required:true
    },
    firstName :  {
        type:String,
        trim:true,
        required:true
    },
    lastName :  {
        type:String,
        trim:true,
        required:true
    }

})

const User = mongosse.Model("User",userSchema);

module.exports = User;