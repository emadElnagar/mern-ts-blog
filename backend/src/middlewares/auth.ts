import JWT from 'jsonwebtoken';

export const generateToken = (user: {
  _id: object;
  firstName: string;
  lastName: string;
  email: string;
  role: string; 
}) => {
  return JWT.sign({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }, process.env.JWT_SECRET!, {
    expiresIn: '3d',
  });
};
