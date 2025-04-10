import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/password_encrypt.js";
import generateOTP from "../utils/generateOTP.js";
import semdEmail from "../utils/sendEmail.js";

const signup = async (req, res, next)=>{
    try {
        
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 3,
        });

        await newUser.save();

        res.json({code: 201, staus: true, message: "User created successfully"});

    } catch (error) {
        res.json({code: 500, status: false, message: "Internal server error"});
    }
}

const signin = async (req, res, next) => {
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({code: 400, status: false, message: "Please provide email and password"});
    }

    try {
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({code: 404, status: false, message: "User not found"});
        }

        const isValid = await verifyPassword(password, user.password);
        if(!isValid){
            return res.status(401).json({code: 401, status: false, message: "Invalid credentials"});
        }

        // Generate JWT token
        const token = jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Send the token and user data in the response
        res.status(200).json({
            status: true,
            message: 'Signin successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        })

    } catch (error) {
        res.json({code: 500, status: false, message: "Internal server error"});
    }
}

const sendVerificationCode = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ code: 400, status: false, message: "Please provide email" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ code: 404, status: false, message: "User not found" });
        }

        // Generate verification code and send it to the user's email
        const code = generateOTP();

        user.verificationCode = code;
        await user.save();

        // Send the verification code to the user's email
        const subject = "Verification Code";
        const content = "verify your email";
        const emailTo = email;
        await semdEmail({ emailTo, subject, code, content });

        res.status(200).json({ code: 200, status: true, message: "Verification code sent successfully" });

    } catch (error) {
        res.json({ code: 500, status: false, message: "Internal server error" });
    }
}

// user verification function
const verifyUser = async (req, res, next) => {
    const { email, code } = req.body;
    
    if (!email || !code) {
        return res.status(400).json({ code: 400, status: false, message: "Please provide email and code" });
    }

    try {
        
        const user = await User.findOne({ email});

        if(!user){
            return res.status(404).json({ code: 404, status: false, message: "User not found" });
        }

        if(user.verificationCode !== code){
            return res.status(401).json({ code: 401, status: false, message: "Invalid verification code" });
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.json({ code: 200, status: true, message: "User verified successfully" });

    } catch (error) {
        
        res.json({ code: 500, staus: false, message: "Internal server error." });

    }
}

// send forgot password code function
const sendForgotPasswordCode = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ code: 400, status: false, message: "Please provide email" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ code: 404, status: false, message: "User not found" });
        }

        // Generate verification code and send it to the user's email
        const code = generateOTP();

        user.forgotPasswordCode = code;
        await user.save();

        // Send the verification code to the user's email
        const subject = "Verification Code";
        const content = "verify your email";
        const emailTo = email;
        await semdEmail({ emailTo, subject, code, content });

        res.status(200).json({ code: 200, status: true, message: "Verification code sent successfully" });

    } catch (error) {
        res.json({ code: 500, status: false, message: "Internal server error" });
    }
}

// recover password function
const recoverPassword = async (req, res, next) => {

    const { email, code, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ code: 404, status: false, message: "User not found" });
        }

        if( user.forgotPasswordCode !== code ){
            return res.status(404).json({ code: 400, status: false, message: "Code not matched" });
        }

        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ code: 200, status: true, message: "Password changed successfully" });

    } catch (error) {
        res.json({code: 500, status: false, message: "Internal server error"});
    }
}

const changePassword = async (req, res, next) => {
    
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ code: 404, status: false, message: "User not found" });
        }

        const match = await verifyPassword(oldPassword, user.password);
        
        if(!match){
            return res.status(401).json({ code: 401, status: false, message: "Old password is incorrect" });
        }
        
        if( oldPassword === newPassword ){
            return res.status(401).json({ code: 401, status: false, message: "Old password and new password are same." });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.json({code: 200, status: true, message: "Change password successfully"});
    } catch (error) {
        res.json({code: 500, status: false, message: "Internal server error"});
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ code: 404, status: false, message: "User not found" });
        }

        user.name = name;

        await user.save();

        res.json({code: 200, status: true, message: "Profile updated successfully"});
    } catch (error) {
        res.json({code: 500, status: false, message: "Internal server error"});
    }
}

export { signup, signin, sendVerificationCode, verifyUser, sendForgotPasswordCode, recoverPassword, changePassword, updateProfile };