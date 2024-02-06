import { Router } from "express";
import { getAllUsers, userRegister } from "../controllers/userController";

const userRouter = Router();

// User register
userRouter.post('/register', userRegister);

// Get all users
userRouter.get('/all', getAllUsers);

export default userRouter;
