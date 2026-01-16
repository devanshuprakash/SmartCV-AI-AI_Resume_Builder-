import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    return token;

}

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user= await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const token = generateToken(newUser._id);
        newUser.password=undefined;
        return res.status(201).json({ message:"user created sucessfully",user: newUser, token });
       }catch(error){
        return  res.status(400).json({ message: "Server error", error: error.message });
       }};

    // Login User

export const loginUser = async (req, res) => {
    try {
        const { email,password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: "Invalied email or password" });
        };

        if (!user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalied email or password" });
        }

        const token = generateToken(user._id);
        user.password=undefined;
        return res.status(201).json({ message:"user logged in sucessfully",user, token });
       }catch(error){
        return  res.status(400).json({ message: "Server error", error: error.message });
       }};

// get user by id
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        user.password = undefined;
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};