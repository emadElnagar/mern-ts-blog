import { RequestHandler } from "express";
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from "../middlewares/auth";

// Register user
export const userRegister: RequestHandler = async (req, res) => {
  const foundEmail = await User.findOne({ email: req.body.email });
  if (foundEmail) {
    res.json({ message: 'This Email already exists, Try another one' });
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
  const token = generateToken(user);
  user.save().then(_user => {
    res.status(200).json({
      token
    });
  }).catch(error => {
    res.status(401).json({
      message: error.message
    });
  });
}

// User login
export const userLogin: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if(bcrypt.compareSync(req.body.password, user.password)){
      const token = generateToken(user);
      res.status(200).json({
        token
      });
    }
  }
}

// Get all users
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
}

// Get single user
export const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

// Delete user
export const deleteUser: RequestHandler = async (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(_result => {
    res.status(200).json({
      message: "User Deleted Successfully"
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error Deleting User" + error.message
    });
  });
}

// CHANGE USER PASSWORD
export const changePassword: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const validate = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!validate) {
      res.status(401).json({
        message: 'Current password is not correct'
      });
    }
    const newUser = { password: await bcrypt.hash(req.body.newPassword, 10) };
    User.updateOne({ _id: req.params.id }, { $set: newUser }).then(_result => {
      res.status(200).json({
        message: "Password changed successfully"
      });
    }).catch(error => {
      res.status(401).json({
        message: error.message
      });
    });
  }
}
