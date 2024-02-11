import { RequestHandler } from "express";
import User from '../models/User';
import bcrypt from 'bcrypt';

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
  user.save().then(_user => {
    res.status(200).json({
      message: 'User registered successfully'
    });
  }).catch(error => {
    res.status(401).json({
      message: error.message
    });
  });
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
