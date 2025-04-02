import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/password_encrypt.js";

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

export { signup, signin };