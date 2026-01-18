import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
const app = express();
app.use('/api/users',userRouter);
await connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is live")
})
app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRouter);


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
}) 