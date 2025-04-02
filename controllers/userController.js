import userModel from "../models/userModel.js";
import { hashPassword } from "../utils/password_encrypt.js";

const signup = async (req, res, next)=>{
    try {
        
        const { name, email, password, role } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role: 3,
        });

        await newUser.save();

        res.json({code: 201, staus: true, message: "User created successfully"});

    } catch (error) {
        next(error);
    }
}

export { signup };