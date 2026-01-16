import mongoose from "mongoose"; 
import "dotenv/config";
const connectDB = async () => { 
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });
    let mongodbURI = process.env.MONGODB_URI;

    const projectName = "resume_builder";
    if (!mongodbURI){
        throw new Error("MongoDBURL not found in environment variables");
    };
    if(mongodbURI.endsWith("/")){
        mongodbURI = mongodbURI.slice(0,-1);
    };
    await mongoose.connect(`${mongodbURI}/${projectName}`)
 

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  } };

export default connectDB;