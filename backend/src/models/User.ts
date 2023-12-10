import { Schema, model } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isModerator: boolean;
  image?: string;
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isModerator: { type: Boolean, default: false },
  image: String,
}, {
  timestamps: true
});

const User = model("User", userSchema);
export default User;
