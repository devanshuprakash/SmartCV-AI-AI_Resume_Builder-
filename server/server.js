import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

/* 🔴 CORS MUST COME FIRST */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

/* 🔴 BODY PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔴 ROUTES */
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

/* TEST ROUTE */
app.get('/', (req, res) => {
  res.send("Server is live");
});

/* DB */
await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
