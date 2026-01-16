import express from 'express';
import { getUserById, loginUser, registerUser } from '../controllers/userControllers';
import protect from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.gety('/data',protect,getUserById);

export default userRouter;