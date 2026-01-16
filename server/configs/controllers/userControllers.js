import User from "../models/User";
import bcrypt from "bcrypt";

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
    // Token generation logic (e.g., JWT)
}


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
       }