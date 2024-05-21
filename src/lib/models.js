import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userName: { type: String },
    password: { type: String },
    googleAccount: { type: Boolean, default: false },
    githubAccount: { type: Boolean, default: false },
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