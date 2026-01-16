import express from 'express';
import { getUserById, loginUser, registerUser ,getUserResumes} from '../controllers/userControllers';
import protect from '../middlewares/authMiddleware';


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.gety('/data',protect,getUserById);
userRouter.get('/resumes',protect,getUserResumes);
export default userRouter;