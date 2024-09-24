const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/paytm")
const accountSchema = mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    Balance : {
        type : Number,
        require : true
    }
})

const Account = mongoose.model("Account" , accountSchema);

module.exports = {
    Account
}