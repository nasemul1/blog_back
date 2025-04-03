import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    // role->1: super admin, role->2: admin, role->3: user
    role: {type: Number, default: 3},
    isVerified: {type: Boolean, default: false},
    verificationCode: {type: String},
}, {timestamps: true})

const userModel = mongoose.model("user", userSchema);
export default userModel;