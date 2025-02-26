import userModel from "../models/userModel.js";


const signup = async (req, res, next)=>{
    try {
        
        const { name, email, password, role } = req.body;
        const newUser = new userModel({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({message: "User created successfully"});

    } catch (error) {
        next(error);
    }
}

export { signup };