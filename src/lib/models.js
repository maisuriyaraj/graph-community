import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
    },
    userName: { type: String, trim: true },
    password: { type: String, select: false },
    googleAccount: { type: Boolean, default: false },
    githubAccount: { type: Boolean, default: false },
    phone_number:{type:String,default:null},
    profile_picture: { type: String, default: null },
    background_cover: { type: String, default: null },
    company_name: { type: String, default: null },
    job_description: { type: String, default: null },
    languages: { type: [String], default: [] },
    bio: { type: String, default: null },
}, { timestamps: true });

export const userModel = mongoose.models.users ||  mongoose.model('users', userSchema);


const AuthTableSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    device_token: { type: String, default: null },
    fcm_token: { type: String, default: null },
    isExpired: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    access_token: { type: String }
})

export const AuthTableModel = mongoose.models.Tokens ||  mongoose.model('Tokens', AuthTableSchema);