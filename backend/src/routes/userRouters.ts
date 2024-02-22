import { Router } from "express";
import { 
  deleteUser, 
  getAllUsers, 
  getSingleUser, 
  userLogin, 
  userRegister 
} from "../controllers/userController";

const userRouter = Router();

// User register
userRouter.post('/register', userRegister);

// User login
userRouter.post('/login', userLogin);

// Get all users
userRouter.get('/all', getAllUsers);

// Get single user
userRouter.get('/profile/:id', getSingleUser);

// Delete user
userRouter.delete('/:id/delete', deleteUser);

export default userRouter;
