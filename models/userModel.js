const mongoose  = require('mongoose');
const {Schema , model} = mongoose;
const userSchema = new Schema({
    name :String,
    email:String,
    password:String,
    refreshToken:String,
    role:{
        type:Array,
        default:["user"],
    },
    userStatus :{
        type:Boolean,
        default:true,
    }
});
const userModel = model("User", userSchema);
module.exports = userModel;