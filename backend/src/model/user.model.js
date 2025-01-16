import mongoose from "mongoose";





const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    fullName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true,
        minlength : 6,
        select : false
    },
    profilePic  :{
        type : String,
        default : ""
    }
}, {
    timestamps : true
})
// in model the "User" will be converted to "users"
export const userModel = mongoose.model("User", userSchema)