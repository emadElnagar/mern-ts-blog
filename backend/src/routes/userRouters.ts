import { Router } from "express";
import { 
  deleteUser, 
  getAllUsers, 
  getSingleUser, 
  userRegister 
} from "../controllers/userController";

const userRouter = Router();

// User register
userRouter.post('/register', userRegister);

// Get all users
userRouter.get('/all', getAllUsers);

// Get single user
userRouter.get('/profile/:id', getSingleUser);

// Delete user
userRouter.delete('/:id/delete', deleteUser);

export default userRouter;
