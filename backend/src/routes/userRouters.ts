import { Router } from "express";
import { 
  changePassword,
  changeUserEmail,
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

// Delete user account
userRouter.post('/:id/account/delete')

// Delete user
userRouter.delete('/:id/delete', deleteUser);

// Change user password
userRouter.patch('/:id/change-password', changePassword);

// Change user email
userRouter.patch('/:id/change-email', changeUserEmail);

export default userRouter;
