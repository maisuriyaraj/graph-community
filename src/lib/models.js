import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String,required:true},
    userName:{type:String},
    authToken:{type:String},
    password:{type:String},
    googleAccount:{type:Boolean,default:false},
    githubAccount:{type:Boolean,default:false},
});

export const userModel = mongoose.model('users',userSchema);