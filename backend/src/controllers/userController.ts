import { RequestHandler, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";
import path from "path";
import fs from "fs";

// Register user
export const userRegister: RequestHandler = async (req, res) => {
  try {
    const foundEmail = await User.findOne({ email: req.body.email });
    if (foundEmail) {
      return res
        .status(401)
        .json({ message: "This Email already exists, Try another one" });
    }
    interface userType {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
    const user = new User<userType>({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    const token = generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image ?? "",
    });
    await user.save();
    res.status(201).json({
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// User login
export const userLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image ?? "",
    });
    res.status(200).json({
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all users
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single user
export const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete my account (for user)
export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(401).json({
        message: "Password is not correct",
      });
    }
    // Remove image if it exists
    if (user.image) {
      const oldImagePath = path.resolve(
        __dirname,
        "../../uploads/images",
        user.image
      );
      fs.promises.unlink(oldImagePath).catch((err) => {
        console.warn(`Failed to delete image (${user.image}):`, err.message);
      });
    }
    // Delete account
    await User.deleteOne({ _id: user._id });
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete user (for admin)
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remove if it exists
    if (user.image) {
      const oldImagePath = path.resolve(
        __dirname,
        "../../uploads/images",
        user.image
      );
      fs.promises.unlink(oldImagePath).catch((err) => {
        console.warn(`Failed to delete image (${user.image}):`, err.message);
      });
    }
    // Delete user
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CHANGE USER PASSWORD
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    const validate = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!validate) {
      return res.status(401).json({
        message: "Current password is not correct",
      });
    }
    const newUser = { password: await bcrypt.hash(req.body.newPassword, 10) };
    await User.updateOne({ _id: user._id }, { $set: newUser });
    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change user email
export const changeUserEmail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    const foundEmail = await User.findOne({ email: req.body.email });
    if (foundEmail) {
      return res
        .status(401)
        .json({ message: "This Email already exists, Try another one" });
    }
    User.updateOne({ _id: user._id }, { $set: { email: req.body.email } });
    res.status(200).json({
      message: "Email updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change user first and last name
export const updateUserName = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    await User.updateOne({ _id: user._id }, { $set: newUser });
    res.status(200).json({
      message: "user updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change user role
export const ChangeUserRole = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newUser = { role: req.body.role };
    await User.updateOne({ _id: req.params.id }, { $set: newUser });
    res.status(200).json({
      message: "user role updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// // Change user image
export const ChangeUserImage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    // Remove old image if it exists
    if (user.image) {
      const oldImagePath = path.resolve(
        __dirname,
        "../../uploads/images",
        user.image
      );
      fs.promises.unlink(oldImagePath).catch((err) => {
        console.warn(
          `Failed to delete old image (${user.image}):`,
          err.message
        );
      });
    }
    // Update user image
    const newUser = { image: req.file.filename };
    await User.updateOne({ _id: user._id }, { $set: newUser });
    res.status(200).json({
      message: "Image uploaded successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
