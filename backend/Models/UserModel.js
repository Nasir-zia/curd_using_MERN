const mongoose = require("mongoose")
const UserModelSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true},
        age:{
            type:Number,


        }
        ,
    

}, {timestamps : true})
const UserData = mongoose.model("UserData" , UserModelSchema)
module.exports = UserData