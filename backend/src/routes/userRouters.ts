import { Router } from "express";
import { 
  ChangeUserImage,
  ChangeUserRole,
  changePassword,
  changeUserEmail,
  deleteUser, 
  getAllUsers, 
  getSingleUser, 
  updateUserName, 
  userLogin, 
  userRegister 
} from "../controllers/userController";
import upload from "../middlewares/Multer";

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

// Change user first and last name
userRouter.patch('/:id/update/name', updateUserName);

// Change user role
userRouter.patch('/:id/update/role', ChangeUserRole);

// Change user image
userRouter.patch('/:id/update/image', upload.single('profile'),ChangeUserImage);

export default userRouter;
