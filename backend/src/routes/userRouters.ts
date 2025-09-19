import { RequestHandler, Router } from "express";
import {
  ChangeUserImage,
  ChangeUserRole,
  changePassword,
  changeUserEmail,
  deleteProfile,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserName,
  userLogin,
  userRegister,
} from "../controllers/userController";
import upload from "../middlewares/Multer";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";

const userRouter = Router();

// User register
userRouter.post("/register", userRegister);

// User login
userRouter.post("/login", userLogin);

// Get all users
userRouter.get("/", getAllUsers);

// Get single user
userRouter.get("/:id", getSingleUser);

// Delete user account
userRouter.post("/delete", isAuth as RequestHandler, (req, res) =>
  deleteProfile(req as AuthenticatedRequest, res)
);

// Delete user
userRouter.delete(
  "/:id",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => deleteUser(req as AuthenticatedRequest, res)
);

// Change user password
userRouter.patch("/change-password", isAuth as RequestHandler, (req, res) =>
  changePassword(req as AuthenticatedRequest, res)
);

// Change user email
userRouter.patch("/change-email", isAuth as RequestHandler, (req, res) =>
  changeUserEmail(req as AuthenticatedRequest, res)
);

// Change user first and last name
userRouter.patch("/update/name", isAuth as RequestHandler, (req, res) =>
  updateUserName(req as AuthenticatedRequest, res)
);

// Change user role
userRouter.patch(
  "/:id/update/role",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => ChangeUserRole(req as AuthenticatedRequest, res)
);

// Change user image
userRouter.patch(
  "/update/image",
  upload.single("profile"),
  isAuth as RequestHandler,
  (req, res) => ChangeUserImage(req as AuthenticatedRequest, res)
);

export default userRouter;
