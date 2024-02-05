import { Router } from "express";
import { userRegister } from "../controllers/userController";

const userRouter = Router();

userRouter.post('/register', userRegister);

export default userRouter;
