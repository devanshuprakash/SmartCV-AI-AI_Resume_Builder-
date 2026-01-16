import jwt from "jsonwebtoken";
import "dotenv/config";

const protect = async(req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    try{
        const decoeded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoeded.id;
        next();
    }catch(error){
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default protect;